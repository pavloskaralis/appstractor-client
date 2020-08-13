import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import QuantityControls from '../CreateControls/QuantityControls'
import ShadowControls from '../CreateControls/ShadowControls'
import BackgroundControls from '../CreateControls/BackgroundControls'
import PatternControls from '../CreateControls/PatternControls'
import RenderControls from '../CreateControls/RenderControls'
import AccordianWrap from './AccordianWrap/AccordianWrap'
import {useSelector} from 'react-redux'

const styles = makeStyles((theme) => ({
    drawer: {
      width: 278,
    },
    drawerPaper: {
      width: 278,
      borderRight: 'none'
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


export default function CreateDrawer() {
    const classes = styles();
    const {quantity, maxUnits, background, pattern, shadow} = useSelector(state => state.canvas);
    const {preset, customPreset, createClicked, rendering, firstRender, animation} = useSelector(state => state.interface);

    return (
        <Drawer
            variant='permanent'
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
        >
            <div className={classes.drawerContainer}>
                <Toolbar/>
                <AccordianWrap heading='Render'>
                    <RenderControls context={{preset, rendering, customPreset, createClicked, firstRender, animation}}/>
                </AccordianWrap>
                <AccordianWrap heading='Quantity'>
                    <QuantityControls context={{preset, quantity, maxUnits}}/>
                </AccordianWrap>
                <AccordianWrap heading='Background'>
                    <BackgroundControls context={{preset, background}}/>
                </AccordianWrap>
                <AccordianWrap heading='Pattern'>
                    <PatternControls context={{preset, pattern}}/>   
                 </AccordianWrap>            
                <AccordianWrap heading='Shadow'>
                    <ShadowControls context={{preset, shadow}}/>
                </AccordianWrap>
            </div>
        </Drawer>         
    );
}

