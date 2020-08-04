import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Tooltip from '@material-ui/core/Tooltip'
import blue from '@material-ui/core/colors/blue'
import AccordianWrap from './AccordianWrap'
import toggleCreateClicked from '../../../../Actions/Render/toggleCreateClicked'
import loadPreset from '../../../../Actions/Canvas/loadPreset'
import renderAppstraction from '../../../../Actions/Canvas/renderAppstraction'
import {defaultPreset} from '../../../../Presets/allPresets'
import toggleRendering from '../../../../Actions/Render/toggleRendering';
import toggleRerenderClicked from '../../../../Actions/Interface/toggleRerenderClicked';
import toggleAnimation from '../../../../Actions/Interface/toggleAnimation'

const styles = makeStyles((theme) => ({
    button: {
        marginBottom: 12
    },
    disabled: {
        backgroundColor: `${theme.palette.primary.dark} !important`
    },
    formControl: {
        marginTop: 12,
        width: '50%',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: blue[200],
            opacity: .9,
        },
        '& .MuiFormLabel-colorSecondary.Mui-focused':{
            color: theme.palette.text.secondary,
        }    
    }

}));

export default function RenderControls() {
    const classes = styles();
    const dispatch = useDispatch();
    //access render state
    const {preset, custom, createClicked, firstRender, animation} = useSelector(state => state.interface);
    
    const [state,setState] = useState({
        rerender: false,
        animation: animation
    })
    
    //prevent animation lag with set timeout
    const dispatchToggleCreateClicked = () => {
        //add loader here only 
        dispatch(toggleRendering(true))
        if(!firstRender)dispatch(toggleRerenderClicked(true))
        setTimeout(()=>{
            dispatch(renderAppstraction()); 
            dispatch(toggleCreateClicked(true)); 
        },0)
    }

    const handleSwitchClick = (event, value) => {
        const name = event.target.name
        console.log(name, state.rerender)
        setState(state => ({...state, [name]: !state[name]}));
        if(name === 'animation'){
            setTimeout(()=>{
                dispatch(toggleAnimation(!animation))
            },150)
        }
    }

    return (
        <AccordianWrap heading='Render' >
            <Button disabled={createClicked && !state.rerender} onClick={dispatchToggleCreateClicked} classes={{root: classes.button, disabled: classes.disabled}} color='primary' variant='contained'>Create Appstraction</Button>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch size='small' checked={state.rerender} onClick={handleSwitchClick} name="rerender" />}
                        label="Rerender"
                    />
                    <FormControlLabel
                        control={<Switch size='small' checked={state.animation} onClick={handleSwitchClick} name="animation" />}
                        label="Animation"
                    />
                </FormGroup>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel color='secondary' id="presets-label">Presets</InputLabel>
                <Select
                    color='secondary'
                    labelId="presets-label"
                    id="presets-select"
                    value='Default'
                    label="Presets"
                >
                    <MenuItem value='Default'>Default</MenuItem>
                    <MenuItem value='Custom'>Custom</MenuItem>
                </Select>
            </FormControl>
        </AccordianWrap>
    );
}

