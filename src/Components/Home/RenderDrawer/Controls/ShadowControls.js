import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import AccordianWrap from './AccordianWrap'
import ValueLabel from './ValueLabel'
import {setShadowOpacity, setShadowAngle, setShadowSize} from '../../../../Actions/Canvas/shadowActions'

const styles = makeStyles((theme) => ({
    controlHeading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    },
}));

export default function QuantityControls() {
    const classes = styles();
    const shadow = useSelector(state => state.canvas.shadow);
    const dispatch = useDispatch(); 
    //local state prevents control lag
    //store state too slow to directly connect to controllers 
    const [state,setState] = useState({
        opacity: shadow.opacity / .01,
        angle: shadow.angle / .0005,
        size: shadow.size / .0005
    })

    //must be 3 as there is no simple way to check which slider was clicked 
    //if mouse is released over a non slider element
    const dispatchOpacityChange = (event,value) => {
        dispatch(setShadowOpacity(value * .01))
    }
    const dispatchAngleChange = (event,value) => {
        return dispatch(setShadowAngle(value * .0005))
    }

    const dispatchSizeChange = (event,value) => {
        return dispatch(setShadowSize(value * .0005))
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
        <AccordianWrap heading='Shadow'>
            <Typography gutterBottom className={classes.controlHeading}>Opacity</Typography>
            <Slider
               color='secondary'
               value={state.opacity}
               ValueLabelComponent={ValueLabel}
               onChange={handleOpacityChange}
               onChangeCommitted={dispatchOpacityChange}
               max={100}
               min={0}
            />
            <Typography gutterBottom className={classes.controlHeading}>Angle</Typography>
            <Slider
               color='secondary'
               value={state.angle}
               ValueLabelComponent={ValueLabel}
               onChange={handleAngleChange}
               onChangeCommitted={dispatchAngleChange}
               max={100}
               min={0}
            />
            <Typography gutterBottom className={classes.controlHeading}>Size</Typography>
            <Slider
               color='secondary'
               value={state.size}
               ValueLabelComponent={ValueLabel}
               onChange={handleSizeChange}
               onChangeCommitted={dispatchSizeChange}
               max={100}
               min={0}
            />
        </AccordianWrap> 
    );
}

