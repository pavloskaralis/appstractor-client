import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import AccordianWrap from './AccordianWrap'
import ValueLabel from './ValueLabel'
import {setShadowOpacity, setShadowAngle, setShadowSize} from '../../../Actions/Canvas/shadowActions'

const styles = makeStyles((theme) => ({
    controlHeading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    },
}));

export default function QuantityControls() {
    const quantity = useSelector(state => state.canvas.quantity);
    const dispatch = useDispatch(); 

    const classes = styles();

    const handleChange = (event,value) => {
        const ariaLabel = event.target.ariaLabel
        switch (ariaLabel) {
            case 'opacity-slider': 
                return dispatch(setShadowOpacity(value * .01))
            case 'angle-slider': 
                return dispatch(setShadowAngle(value * .0005))
            case 'size-slider': 
                return dispatch(setShadowSize(value * .0005))
            default:
                return
        }
    }

    return (
        <AccordianWrap heading='Shadow'>
            <Typography gutterBottom className={classes.controlHeading}>Opacity</Typography>
            <Slider
               aria-label='opacity-slider'
               color='secondary'
               defaultValue={0}
               ValueLabelComponent={ValueLabel}
               onChangeCommitted={handleChange}
               max={100}
               min={0}
            />
            <Typography gutterBottom className={classes.controlHeading}>Angle</Typography>
            <Slider
               aria-label='angle-slider'
               color='secondary'
               defaultValue={0}
               ValueLabelComponent={ValueLabel}
               onChangeCommitted={handleChange}
               max={100}
               min={0}
            />
            <Typography gutterBottom className={classes.controlHeading}>Size</Typography>
            <Slider
               aria-label='size-slider'
               color='secondary'
               defaultValue={0}
               ValueLabelComponent={ValueLabel}
               onChangeCommitted={handleChange}
               max={100}
               min={0}
            />
        </AccordianWrap> 
    );
}

