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
import blue from '@material-ui/core/colors/blue'
import AccordianWrap from './AccordianWrap'
import renderAppstraction from '../../../../Actions/Canvas/renderAppstraction'
import loadPreset from '../../../../Actions/Canvas/loadPreset'
import {defaultPreset} from '../../../../Presets/allPresets'
import {toggleRendering, toggleCreateClicked, toggleRerenderClicked,toggleAnimation, toggleFirstRender, setPreset} from '../../../../Actions/Interface/allInterfaceActions'


const styles = makeStyles((theme) => ({
    button: {
        marginBottom: 12
    },
    disabled: {
        backgroundColor: `${theme.palette.primary.dark} !important`
    },
    formControl: {
        marginTop: 12,
        width: '55%',
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
    //access interface state
    const {preset, custom, createClicked, firstRender, animation} = useSelector(state => state.interface);
    //switch values
    const [state,setState] = useState({
        rerender: false,
        animation: animation
    })
    
    //create appstraction on click
    const handleButtonClick = () => {
        //add spinning loader; resets to false after canvas receives new random values and swap pattern 
        dispatch(toggleRendering(true))
        //enable rerender animation; resets to false after animation completes
        if(!firstRender){
            dispatch(toggleRerenderClicked(true))
            setTimeout(()=>dispatch(toggleRerenderClicked(false)),1500)
        }
        setTimeout(()=>{
            //create new random values and swap pattern
            dispatch(renderAppstraction()); 
            //enable visibility of stripes; triggers first render animation; resets to false when new image gets selected
            if(firstRender){
                dispatch(toggleCreateClicked(true)); 
                //change animation effect after animation completes; resets to false when new image gets selected 
                //first render transitions opacity, while rerender transitions background
                setTimeout(()=>dispatch(toggleFirstRender(false)),1500)
            }
        },0)
    }

    //switch button on click
    const handleSwitchClick = (event, value) => {
        const name = event.target.name
        setState(state => ({...state, [name]: !state[name]}));
        if(name === 'animation'){
            //timeout prevents switch animation lag
            setTimeout(()=>{
                dispatch(toggleAnimation(!animation))
            },150)
        }
    }

    const handleSelectChange = (event) => {
        dispatch(setPreset(event.target.value))
    }

    return (
        <AccordianWrap heading='Render' >
            <Button disabled={createClicked && !state.rerender} onClick={handleButtonClick} classes={{root: classes.button, disabled: classes.disabled}} color='primary' variant='contained'>Create Appstraction</Button>
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
                    value={preset}
                    label="Presets"
                    onChange={handleSelectChange}
                >
                    <MenuItem value='default'>Default</MenuItem>
                    <MenuItem value='custom'>Custom</MenuItem>
                </Select>
            </FormControl>
        </AccordianWrap>
    );
}

