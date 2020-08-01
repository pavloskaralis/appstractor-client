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
import {BlueSwitch, BlueSlider} from './CustomColors'

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
    switch: {
        margin: '6px 0',
        marginLeft: 3,
    },
    thumb: {
        color: 'red',
        '&$checked': {
            color: theme.palette.secondary,
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.secondary,
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
                  
                   <FormControl component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                classes={{label: classes.formControlLabel}}
                                control={<BlueSwitch className={classes.switch} size='small' checked={true}  name="Stretch" />}
                                label="Rerender"
                            />
                            <FormControlLabel
                                classes={{label: classes.formControlLabel}}
                                control={<BlueSwitch className={classes.switch} size='small' checked={false} name="Ellipse" />}
                                label="Click Editing"
                            />
                            
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        <Divider className={classes.divider}/>
        </>         
    );
}

