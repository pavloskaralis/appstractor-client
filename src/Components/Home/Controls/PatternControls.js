import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import AccordionWrap from './AccordianWrap'
import setPattern from '../../../Actions/Canvas/setPattern'


export default function PatternControls() {
    const pattern = useSelector(state => state.canvas.pattern);
    const dispatch = useDispatch(); 
    

    const handleChange = (event) => {
        const value = event.target.value; 
        dispatch(setPattern(value))
    };


   
    return (
        <AccordionWrap heading='Pattern'>
            <FormControl component="fieldset">
                <RadioGroup aria-label="pattern" onChange={handleChange} value={pattern}>
                    <FormControlLabel value="random" control={<Radio />} label="Random" />
                    <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
                    <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
                    <FormControlLabel value="woven" control={<Radio />} label="Woven" />
                </RadioGroup>    
            </FormControl>
        </AccordionWrap>
    );
}

