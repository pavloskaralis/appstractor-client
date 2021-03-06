import React, {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import ValueLabel from './ValueLabel'
import {setShadowOpacity, setShadowAngle, setShadowSize} from '../../../../Actions/Canvas/shadowActions'
import setPreset from '../../../../Actions/Interface/setPreset'
import toggleRendering from '../../../../Actions/Interface/toggleRendering'

const styles = makeStyles((theme) => ({
    controlHeading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    },
}));

export default function QuantityControls({context}) {
    const classes = styles();
    const {shadow, preset} = context;
    const dispatch = useDispatch(); 
    //local state prevents control lag
    //store state too slow to directly connect to controllers 
    const [state,setState] = useState({
        opacity: shadow.opacity / .01,
        angle: shadow.angle / .0005,
        size: shadow.size / .0005
    })

    //change controls when preset is loaded
    useEffect(()=> { 
        setState({
            opacity: shadow.opacity / .01,
            angle: shadow.angle / .0005,
            size: shadow.size / .0005
        })
    },[shadow])

    //must be 3 as there is no simple way to check which slider was clicked 
    //if mouse is released over a non slider element
    const dispatchOpacityChange = (event,value) => {
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(toggleRendering(true))
        setTimeout(()=> dispatch(setShadowOpacity(value * .01)),0)
       
    }
    const dispatchAngleChange = (event,value) => {
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(toggleRendering(true))
        setTimeout(()=>dispatch(setShadowAngle(value * .0005)),0)
    }

    const dispatchSizeChange = (event,value) => {
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(toggleRendering(true))
        setTimeout(()=>dispatch(setShadowSize(value * .0005)),0)
    }

    //slider onChange
    //must be 3 otherwise slider animation lags
    const handleOpacityChange = (event, value) => {
        setState(state=>({
            ...state,
            opacity: value
        }))
    }
    const handleAngleChange = (event, value) => {
        setState(state=>({
            ...state,
            angle: value
        }))
    }
    const handleSizeChange = (event, value) => {
        setState(state=>({
            ...state,
            size: value
        }))
    }


    return (
        <>
            <Typography gutterBottom className={classes.controlHeading}>Opacity</Typography>
            <Slider
               color='secondary'
               value={Math.round(state.opacity)}
               ValueLabelComponent={ValueLabel}
               onChange={handleOpacityChange}
               onChangeCommitted={dispatchOpacityChange}
               max={100}
               min={0}
            />
            <Typography gutterBottom className={classes.controlHeading}>Angle</Typography>
            <Slider
               color='secondary'
               value={Math.round(state.angle)}
               ValueLabelComponent={ValueLabel}
               onChange={handleAngleChange}
               onChangeCommitted={dispatchAngleChange}
               max={100}
               min={0}
            />
            <Typography gutterBottom className={classes.controlHeading}>Size</Typography>
            <Slider
               color='secondary'
               value={Math.round(state.size)}
               ValueLabelComponent={ValueLabel}
               onChange={handleSizeChange}
               onChangeCommitted={dispatchSizeChange}
               max={100}
               min={0}
            />
        </> 
    );
}

