import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import blue from '@material-ui/core/colors/blue'
import AccordianWrap from './AccordianWrap'

const styles = makeStyles((theme) => ({
    button: {
        marginBottom: 12
    },

    formControl: {
        marginTop: 12,
        width: '50%',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: blue[200],
            opacity: .9,
        },
        '& .MuiFormLabel-colorSecondary.Mui-focused':{
            color: theme.palette.text.secondary,
        }
        
    }
 
}));

export default function RenderControls() {
    const classes = styles();
    return (
        <AccordianWrap heading='Render' >
            <Button className={classes.button} color='primary' variant='contained'>Create Appstraction</Button>
            <FormControl component="fieldset">
                <FormGroup>
                    <FormControlLabel
                        control={<Switch size='small' checked={true}  name="Stretch" />}
                        label="Rerender"
                    />
                    <FormControlLabel
                        control={<Switch size='small' checked={false} name="Ellipse" />}
                        label="Click Editing"
                    />           
                </FormGroup>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel color='secondary' id="presets-label">Presets</InputLabel>
                <Select
                    color='secondary'
                    labelId="presets-label"
                    id="presets-select"
                    value='Default'
                    label="Presets"
                >
                    <MenuItem value='Default'>Default</MenuItem>
                    <MenuItem value='Custom'>Custom</MenuItem>
                </Select>
            </FormControl>
        </AccordianWrap>
    );
}

