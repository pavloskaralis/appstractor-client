import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/core/Slider'
import ValueLabel from './ValueLabel'
import {setBackgroundDetail, toggleBackgroundEllipse, toggleBackgroundStretch, toggleBackgroundUniform} from '../../../Actions/Canvas/backgroundActions'
import setPreset from '../../../Actions/Interface/setPreset'


const styles = makeStyles((theme) => ({
    heading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    }, 
}));

export default function BackgroundControls({context}) {
    const classes = styles();
    const {background, preset}= context;
    const dispatch = useDispatch(); 
    //local state prevents control lag
    //store state too slow to directly connect to controllers 
    const [state,setState] = useState({
        stretch: background.stretch,
        ellipse: background.ellipse,
        uniform: background.uniform,
        detail: Math.round(Math.pow(background.detail - 99, 1/3))
    })
    

    //change controls when preset is loaded
    useEffect(()=> { 
        setState({
            stretch: background.stretch,
        ellipse: background.ellipse,
            uniform: background.uniform,
            detail: Math.round(Math.pow(background.detail - 99, 1/3))
        })
    },[background])

    //slider onChange
    const handleSliderChange = (event, value) => {
        setState(state=>({
            ...state,
            detail: value
        }))
    }

    //slider onChangeSubmitted 
    //seperation prevents control animation lag
    const dispatchDetailChange = (event,value) => {
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(setBackgroundDetail(Math.round(Math.pow(value,2.99997851)+99)))
    }

    //toggle on change
    const handleToggleChange = (event) => {
        const name = event.target.name;
        const checked = event.target.checked;
        setState(state=>({
            ...state,
            [name]: checked
        }))
        if(preset !== 'custom')dispatch(setPreset('custom'))
        //prevents control animation lag
        setTimeout(()=>{
            switch (name) {
                case "ellipse": 
                    return dispatch(toggleBackgroundEllipse(checked));
                case "stretch":
                    return dispatch(toggleBackgroundStretch(checked));
                case "uniform":
                    return dispatch(toggleBackgroundUniform(checked));
                default:
                    return
            }
        },150) 
    };

    return (
        <>
            <Typography gutterBottom className={classes.heading}>Detail</Typography>
            <Slider
                aria-label='detail-slider'
                color='secondary'
                value={state.detail}
                ValueLabelComponent={ValueLabel}
                onChange={handleSliderChange}
                onChangeCommitted={dispatchDetailChange}
                max={100}
                min={1}
            />
            <FormGroup>
                <FormControlLabel
                    control={<Switch size='small' onChange={handleToggleChange} checked={state.stretch}  name="stretch" />}
                    label="Stretch"
                />
                <FormControlLabel
                    control={<Switch size='small' onChange={handleToggleChange} checked={state.ellipse} name="ellipse" />}
                    label="Ellipse"
                />
                <FormControlLabel
                    control={<Switch size='small' onChange={handleToggleChange} checked={state.uniform} name="uniform" />}
                    label="Uniform"
                />
            </FormGroup>
        </>
    );
}

