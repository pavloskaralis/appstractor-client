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
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'

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
    }
}));



export default function BackgroundControls() {
    const classes = styles();
    return (
        <>
            <Accordion className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.accordianHeading}>Pattern</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                   <FormControl component="fieldset">
                        <RadioGroup aria-label="pattern" name="pattern1" value={'random'}>
                            <FormControlLabel classes={{label: classes.formControlLabel}} value="random" control={<Radio />} label="Random" />
                            <FormControlLabel classes={{label: classes.formControlLabel}} value="horizontal" control={<Radio />} label="Horizontal" />
                            <FormControlLabel classes={{label: classes.formControlLabel}} value="vertical" control={<Radio />} label="Vertical" />
                            <FormControlLabel classes={{label: classes.formControlLabel}} value="woven" control={<Radio />} label="Woven" />
                        </RadioGroup>    
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        <Divider className={classes.divider}/>
        </>         
    );
}

