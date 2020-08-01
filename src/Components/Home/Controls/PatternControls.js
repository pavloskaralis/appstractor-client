import React from 'react';
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import AccordionWrap from './AccordianWrap'



export default function PatternControls() {
    return (
        <AccordionWrap heading='Pattern'>
            <FormControl component="fieldset">
                <RadioGroup aria-label="pattern" name="pattern1" value={'random'}>
                    <FormControlLabel value="random" control={<Radio />} label="Random" />
                    <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
                    <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
                    <FormControlLabel value="woven" control={<Radio />} label="Woven" />
                </RadioGroup>    
            </FormControl>
        </AccordionWrap>
    );
}

