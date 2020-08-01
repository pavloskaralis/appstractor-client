import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
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
        <AccordianWrap heading='Quantity'>
            <Typography gutterBottom className={classes.controlHeading}>Row</Typography>
            <Slider
                aria-label="custom thumb label"
                defaultValue={20}
                color='secondary'
            />
            <Typography gutterBottom className={classes.controlHeading}>Block</Typography>
            <Slider
                aria-label="custom thumb label"
                defaultValue={20}
                color='secondary'
            />
            <Typography gutterBottom className={classes.controlHeading}>Stripe</Typography>
            <Slider
                aria-label="custom thumb label"
                defaultValue={20}
                color='secondary'
            />
        </AccordianWrap>       
    );
}

