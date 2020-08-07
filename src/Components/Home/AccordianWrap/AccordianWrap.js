import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'


const styles = makeStyles((theme) => ({
    accordian: {
        boxShadow: 'none',
        padding: '0 18px',
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
    heading: {
        textTransform: 'uppercase',
        fontSize: theme.typography.pxToRem(14),
    },
    divider: {
        backgroundColor: theme.palette.background.darkDefault
    }
}));


export default function AccordionWrap({heading, children}) {
    const classes = styles();
    return (
        <>
            <Accordion defaultExpanded={heading === 'Render' ? true : false} className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                >
                    <Typography className={classes.heading}>{heading}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    {children}
                </AccordionDetails>
            </Accordion>
            <Divider className={classes.divider}/>
        </>         
    );
}

