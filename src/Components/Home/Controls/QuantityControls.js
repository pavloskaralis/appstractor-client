import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import AccordianWrap from './AccordianWrap'
import ValueLabel from './ValueLabel'
import {setRowQuantity, setBlockQuantity, setStripeQuantity} from '../../../Actions/Canvas/quantityActions'

const styles = makeStyles((theme) => ({
    controlHeading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    },
}));

//MAY REQUIRE ONCHANGE AND ONCHANGECOMMITED FOR PRESETS

export default function QuantityControls() {
    const quantity = useSelector(state => state.canvas.quantity);
    const dispatch = useDispatch(); 
  
    const classes = styles();

    //must be 3 as there is no simple way to check which slider was clicked 
    //if mouse is released over a non slider element
    const handleRowChange = (event,value) => {
        return dispatch(setRowQuantity(value))
    }
    const handleBlockChange = (event,value) => {
        return dispatch(setBlockQuantity(value))
    }
    const handleStripeChange = (event,value) => {
        return dispatch(setStripeQuantity(value))
    }

    return (
        <AccordianWrap heading='Quantity'>
            <Typography gutterBottom className={classes.controlHeading}>Row</Typography>
            <Slider
                aria-label='row-slider'
                color='secondary'
                defaultValue={6}
                ValueLabelComponent={ValueLabel}
                onChangeCommitted={handleRowChange}
                max={12}
                min={1}
            />
            <Typography gutterBottom className={classes.controlHeading}>Block</Typography>
            <Slider
                aria-label='block-slider'
                color='secondary'
                ValueLabelComponent={ValueLabel}
                defaultValue={9}
                onChangeCommitted={handleBlockChange}
                max={18}
                min={1}
            />
            <Typography gutterBottom className={classes.controlHeading}>Stripe</Typography>
            <Slider
                aria-label='stripe-slider'
                color='secondary'
                ValueLabelComponent={ValueLabel}
                defaultValue={12}
                onChangeCommitted={handleStripeChange}
                max={24}
                min={1}
            />
        </AccordianWrap>       
    );
}

