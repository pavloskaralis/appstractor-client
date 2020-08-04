import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import AccordionWrap from './AccordianWrap'
import setPattern from '../../../../Actions/Canvas/setPattern'


export default function PatternControls() {
    const pattern = useSelector(state => state.canvas.pattern);
    const dispatch = useDispatch(); 
    //local state prevents control lag
    //store state too slow to directly connect to controllers 
    const [state, setState] = useState(pattern);

    const handleChange = (event) => {
        const value = event.target.value; 
        setState(value);
        //prevents control animation lag
        setTimeout(()=>{
            dispatch(setPattern(value));
        },50)
    };
   
    return (
        <AccordionWrap heading='Pattern'>
            <RadioGroup aria-label="pattern" onChange={handleChange} value={state}>
                <FormControlLabel value="random" control={<Radio />} label="Random" />
                <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
                <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
                <FormControlLabel value="alternate" control={<Radio />} label="Alternate" />
            </RadioGroup>    
        </AccordionWrap>
    );
}

