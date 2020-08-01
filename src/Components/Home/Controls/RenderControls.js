import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {BlueSwitch} from './CustomColors'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import blue from '@material-ui/core/colors/blue'

const styles = makeStyles((theme) => ({
  
    accordian: {
        boxShadow: 'none',
        padding: '0 6px',
        overflow: 'hidden',
    },
    accordionDetails: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    expandMoreIcon: {
        color: theme.palette.text.primary
    },
    accordianHeading: {
        textTransform: 'uppercase',
        fontSize: theme.typography.pxToRem(14),
    },
    controlHeading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14)
    },
    divider: {
        backgroundColor: theme.palette.background.darkPaper,
    },
    formControlLabel: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14),
        marginLeft: 6
    },
    button: {
        marginBottom: 12
    },
    label: {
        textTransform: 'capitalize',
        minWidth: '54px'
    },

    select: {
        color: blue[600],
        width: '50%'
    },

   
    icon: {
        color: theme.palette.text.primary,
        opacity: '.9'
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
        <>
            <Accordion defaultExpanded className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.accordianHeading}>Render</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <Button classes={{root: classes.button, label: classes.label}} color='primary' variant='contained'>Create Appstraction</Button>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                classes={{label: classes.formControlLabel}}
                                control={<BlueSwitch size='small' checked={true}  name="Stretch" />}
                                label="Rerender"
                            />
                            <FormControlLabel
                                classes={{label: classes.formControlLabel}}
                                control={<BlueSwitch size='small' checked={false} name="Ellipse" />}
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
                            classes={{root: classes.select, icon: classes.icon}}
                        >
                            <MenuItem value='Default'>Default</MenuItem>
                            <MenuItem value='Custom'>Custom</MenuItem>
                        </Select>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        <Divider className={classes.divider}/>
        </>         
    );
}

