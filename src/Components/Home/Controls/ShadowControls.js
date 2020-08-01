import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import AccordianWrap from './AccordianWrap'

const styles = makeStyles((theme) => ({
    controlHeading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    },
}));

export default function QuantityControls() {
    const classes = styles();
    return (
        <AccordianWrap heading='Shadow'>
            <Typography gutterBottom className={classes.controlHeading}>Opacity</Typography>
            <Slider
                aria-label="custom thumb label"
                defaultValue={20}
                color='secondary'
            />
            <Typography gutterBottom className={classes.controlHeading}>Angle</Typography>
            <Slider
                aria-label="custom thumb label"
                defaultValue={20}
                color='secondary'
            />
            <Typography gutterBottom className={classes.controlHeading}>Size</Typography>
            <Slider
                aria-label="custom thumb label"
                defaultValue={20}
                color='secondary'
            />
        </AccordianWrap> 
    );
}

