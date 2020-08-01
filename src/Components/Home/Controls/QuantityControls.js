import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import {BlueSlider} from './CustomColors'

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
}));

export default function QuantityControls() {
    const classes = styles();
    return (
        <>
            <Accordion className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.accordianHeading}>Quantity</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <Typography gutterBottom className={classes.controlHeading}>Row</Typography>
                    <BlueSlider
                        // ValueLabelComponent={ValueLabelComponent}
                        aria-label="custom thumb label"
                        defaultValue={20}
                        color='secondary'
                    />
                    <Typography gutterBottom className={classes.controlHeading}>Block</Typography>
                    <BlueSlider
                        // ValueLabelComponent={ValueLabelComponent}
                        aria-label="custom thumb label"
                        defaultValue={20}
                        color='secondary'
                    />
                    <Typography gutterBottom className={classes.controlHeading}>Stripe</Typography>
                    <BlueSlider
                        // ValueLabelComponent={ValueLabelComponent}
                        aria-label="custom thumb label"
                        defaultValue={20}
                        color='secondary'
                    />
                </AccordionDetails>
            </Accordion>
        <Divider className={classes.divider}/>
        </>         
    );
}

