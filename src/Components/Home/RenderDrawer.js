import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box'
import { boxSizing } from '@material-ui/system';

const styles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: 'rgba(255,255,255,.05)'
        },
        '*::-webkit-scrollbar-track': {
            boxshadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
            backgroundColor: theme.palette.text.secondary,
            // border: '1px solid rgba(0, 0, 0, 0)',
            // backgroundClip: 'padding-box'
        }
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    listItem: {
        padding: 0,
    },
    accordian: {
        boxShadow: 'none',
        overflow: 'hidden'
    },
    expandMoreIcon: {
        color: theme.palette.text.primary
    },
    heading: {
        textTransform: 'uppercase',
        fontSize: theme.typography.pxToRem(14)
    }

}));

export default function RenderDrawer() {
    const classes = styles();
    return (
        <Drawer
            variant='permanent'
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
        >
            <div className={classes.drawerContainer}>
                <Toolbar/>
                <List>
                    <ListItem className={classes.listItem}>
                        <Accordion className={classes.accordian}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Render</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordianDetails}>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <Divider/>
                    <ListItem className={classes.listItem}>
                        <Accordion className={classes.accordian}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Quantity</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordianDetails}>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <Divider/>
                    <ListItem className={classes.listItem}>
                        <Accordion className={classes.accordian}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Background</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordianDetails}>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <Divider/>
                    <ListItem className={classes.listItem}>
                        <Accordion className={classes.accordian}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Pattern</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordianDetails}>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <Divider/>
                    <ListItem className={classes.listItem}>
                        <Accordion className={classes.accordian}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Shadow</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordianDetails}>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <Divider/>
                </List>
                
                
            </div>
        </Drawer>         
    );
}

