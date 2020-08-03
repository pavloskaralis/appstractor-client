import React, {useState, useEffect} from 'react';
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
    const classes = styles();
    const quantity = useSelector(state => state.canvas.quantity);
    const dispatch = useDispatch(); 
    //local state prevents control lag
    //store state too slow to directly connect to controllers 
    const [state,setState] = useState({
        row: quantity.row,
        block: quantity.block,
        stripe: quantity.stripe
    })

    //change sliders when preset is loaded
    useEffect(()=> { 
        setState({
            row: quantity.row,
            block: quantity.block,
            stripe: quantity.stripe
        })
    },[quantity])

    //must be 3 as there is no simple way to check which slider was clicked 
    //if mouse is released over a non slider element
    const dispatchRowChange = (event,value) => {
        return dispatch(setRowQuantity(value))
    }
    const dispatchBlockChange = (event,value) => {
        return dispatch(setBlockQuantity(value))
    }
    const dispatchStripeChange = (event,value) => {
        return dispatch(setStripeQuantity(value))
    }

    //slider onChange
    //must be 3 otherwise slider animation lags
    const handleRowChange = (event, value) => {
        setState(state=>({
            ...state,
            row: value
        }))
    }
    const handleBlockChange = (event, value) => {
        setState(state=>({
            ...state,
            block: value
        }))
    }
    const handleStripeChange = (event, value) => {
        setState(state=>({
            ...state,
            stripe: value
        }))
    }

   
    return (
        <AccordianWrap heading='Quantity'>
            <Typography gutterBottom className={classes.controlHeading}>Row</Typography>
            <Slider
                color='secondary'
                value={state.row}
                ValueLabelComponent={ValueLabel}
                onChange={handleRowChange}
                onChangeCommitted={dispatchRowChange}
                max={12}
                min={1}
            />
            <Typography gutterBottom className={classes.controlHeading}>Block</Typography>
            <Slider
                color='secondary'
                ValueLabelComponent={ValueLabel}
                value={state.block}
                onChange={handleBlockChange}
                onChangeCommitted={dispatchBlockChange}
                max={18}
                min={1}
            />
            <Typography gutterBottom className={classes.controlHeading}>Stripe</Typography>
            <Slider
                color='secondary'
                ValueLabelComponent={ValueLabel}
                value={state.stripe}
                onChange={handleStripeChange}
                onChangeCommitted={dispatchStripeChange}
                max={24}
                min={1}
            />
        </AccordianWrap>       
    );
}

