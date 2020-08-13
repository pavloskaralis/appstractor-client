import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import setPattern from '../../../../Actions/Canvas/setPattern'
import setPreset from '../../../../Actions/Interface/setPreset'
import toggleRendering from '../../../../Actions/Interface/toggleRendering'


export default function PatternControls({context}) {
    const {pattern, preset} = context;
   
    const dispatch = useDispatch(); 
    //local state prevents control lag
    //store state too slow to directly connect to controllers 
    const [state, setState] = useState(pattern);

    //change controls when preset is loaded
    useEffect(()=> { 
        setState(pattern)
    },[pattern])

    const handleChange = (event) => {
        const value = event.target.value; 
        setState(value);
        if(preset !== 'custom')dispatch(setPreset('custom'))
        dispatch(toggleRendering(true))
        //prevents control animation lag
        setTimeout(()=>{
            dispatch(setPattern(value));
        },50)
    };
   
    return (
        <>
            <RadioGroup aria-label="pattern" onChange={handleChange} value={state}>
                <FormControlLabel value="random" control={<Radio />} label="Random" />
                <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
                <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
                <FormControlLabel value="alternate" control={<Radio />} label="Alternate" />
            </RadioGroup>    
        </>
    );
}

