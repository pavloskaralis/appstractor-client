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
import toggleRerenderClicked from '../../../../Actions/Render/toggleRerenderClicked';

const styles = makeStyles((theme) => ({
    button: {
        marginBottom: 12
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
    const {preset, custom, firstRender} = useSelector(state => state.render);
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

    return (
        <AccordianWrap heading='Render' >
            <Button onClick={dispatchToggleCreateClicked} className={classes.button} color='primary' variant='contained'>Create Appstraction</Button>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch size='small' checked={true}  name="Stretch" />}
                        label="Rerender"
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

