import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import QuantityControls from './Controls/QuantityControls'
import ShadowControls from './Controls/ShadowControls'
import BackgroundControls from './Controls/BackgroundControls'
import PatternControls from './Controls/PatternControls'
import RenderControls from './Controls/RenderControls'

const styles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '5px',
            backgroundColor: theme.palette.background.darkPaper
        },
        '*::-webkit-scrollbar-track': {
            boxshadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
            opacity: 1,
            backgroundColor: theme.palette.primary.dark,
        }
    },
    drawer: {
      width: 279,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 279,
    },
    drawerContainer: {
      overflow: 'auto',
    },
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
                <RenderControls/>
                <QuantityControls/>
                <BackgroundControls/>
                <PatternControls/>               
                <ShadowControls/>    
            </div>
        </Drawer>         
    );
}

