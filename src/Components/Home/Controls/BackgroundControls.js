import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/core/Slider'
import ValueLabel from './ValueLabel'
import AccordianWrap from './AccordianWrap'
import {setBackgroundDetail, toggleBackgroundEllipse, toggleBackgroundStretch, toggleBackgroundUniform} from '../../../Actions/Canvas/backgroundActions'


const styles = makeStyles((theme) => ({
    heading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    }, 
}));

export default function BackgroundControls() {
    const background = useSelector(state => state.canvas.background)
    const dispatch = useDispatch(); 
    
    const classes = styles();

    const handleDetailChange = (event,value) => {
        const convertedValue = background.stretch ? 
            Math.pow(value, 2.99997851) + 99 : Math.pow(value, 2.99978296) + 999
        return dispatch(setBackgroundDetail(convertedValue))
    }

    const handleToggleChange = (event) => {
        const name = event.target.name;
        const checked = event.target.checked;

        switch (name) {
            case "ellipse": 
                return dispatch(toggleBackgroundEllipse(checked));
            case "stretch":
                return dispatch(toggleBackgroundStretch(checked));
            case "uniform":
                return dispatch(toggleBackgroundUniform(checked));
            default:
                return
        }
      };

    return (
        <AccordianWrap heading='Background'>
            <Typography gutterBottom className={classes.heading}>Detail</Typography>
            <Slider
                aria-label='detail-slider'
                color='secondary'
                defaultValue={1}
                ValueLabelComponent={ValueLabel}
                onChangeCommitted={handleDetailChange}
                max={100}
                min={1}
            />
            <FormControl component="fieldset">
                <FormGroup>
                    <FormControlLabel
                        control={<Switch size='small' onChange={handleToggleChange} checked={background.stretch}  name="stretch" />}
                        label="Stretch"
                    />
                    <FormControlLabel
                        control={<Switch size='small' onChange={handleToggleChange} checked={background.ellipse} name="ellipse" />}
                        label="Ellipse"
                    />
                    <FormControlLabel
                        control={<Switch size='small' onChange={handleToggleChange} checked={background.uniform} name="uniform" />}
                        label="Uniform"
                    />
                </FormGroup>
            </FormControl>         
        </AccordianWrap>           
    );
}

