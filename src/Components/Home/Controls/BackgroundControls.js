import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/core/Slider'
import AccordianWrap from './AccordianWrap'

const styles = makeStyles((theme) => ({
    heading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    }, 
}));

export default function BackgroundControls() {
    const classes = styles();
    return (
        <AccordianWrap heading='Background'>
            <Typography gutterBottom className={classes.heading}>Detail</Typography>
            <Slider
                aria-label="custom thumb label"
                defaultValue={20}
                color='secondary'
            />
            <FormControl component="fieldset">
                <FormGroup>
                    <FormControlLabel
                        control={<Switch size='small' checked={true}  name="Stretch" />}
                        label="Stretch"
                    />
                    <FormControlLabel
                        control={<Switch size='small' checked={false} name="Ellipse" />}
                        label="Ellipse"
                    />
                    <FormControlLabel
                        control={<Switch size='small' checked={false} name="Uniform" />}
                        label="Uniform"
                    />
                </FormGroup>
            </FormControl>         
        </AccordianWrap>           
    );
}

