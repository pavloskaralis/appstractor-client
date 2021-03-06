import React, {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import ValueLabel from './ValueLabel'
import {setRowQuantity, setBlockQuantity, setStripeQuantity} from '../../../../Actions/Canvas/quantityActions'
import setPreset from '../../../../Actions/Interface/setPreset'
import toggleRendering from '../../../../Actions/Interface/toggleRendering'

const styles = makeStyles((theme) => ({
    controlHeading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    },
}));

//MAY REQUIRE ONCHANGE AND ONCHANGECOMMITED FOR PRESETS

export default function QuantityControls({context}) {
    const classes = styles();
    const {quantity, maxUnits, preset} = context;

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
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(toggleRendering(true))
        setTimeout(()=>dispatch(setRowQuantity(value)),0);
    }

    const dispatchBlockChange = (event,value) => {
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(toggleRendering(true))
        setTimeout(()=>dispatch(setBlockQuantity(value)),0);
    }
    const dispatchStripeChange = (event,value) => {
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(toggleRendering(true))
        setTimeout(()=>dispatch(setStripeQuantity(value)),0);
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
        <>
            <Typography gutterBottom className={classes.controlHeading}>Row</Typography>
            <Slider
                color='secondary'
                value={state.row}
                ValueLabelComponent={ValueLabel}
                onChange={handleRowChange}
                onChangeCommitted={dispatchRowChange}
                max={maxUnits.row}
                min={1}
            />
            <Typography gutterBottom className={classes.controlHeading}>Block</Typography>
            <Slider
                color='secondary'
                ValueLabelComponent={ValueLabel}
                value={state.block}
                onChange={handleBlockChange}
                onChangeCommitted={dispatchBlockChange}
                max={maxUnits.block}
                min={1}
            />
            <Typography gutterBottom className={classes.controlHeading}>Stripe</Typography>
            <Slider
                color='secondary'
                ValueLabelComponent={ValueLabel}
                value={state.stripe}
                onChange={handleStripeChange}
                onChangeCommitted={dispatchStripeChange}
                max={maxUnits.stripe}
                min={1}
            />
        </>       
    );
}

