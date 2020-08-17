import React, { useState, useEffect } from 'react';
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
      width: 276,
    },
    drawerPaper: {
      width: 276,
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
    const {quantity, maxUnits, background, pattern, shadow, image} = useSelector(state => state.canvas);
    const {preset, customPreset, createClicked, rendering, firstRender, animation} = useSelector(state => state.interface);
    const [delay, toggleDelay] = useState(false)

    //delay render of non visible controls to increase page load
    useEffect(()=>{
        setTimeout(()=> toggleDelay(delay => !delay),0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Drawer
            variant='permanent'
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
        >
            <div className={classes.drawerContainer}>
                <Toolbar/>
                <AccordianWrap heading='Render'>
                    <RenderControls context={{image, preset, rendering, customPreset, createClicked, firstRender, animation}}/>
                </AccordianWrap>
                <AccordianWrap heading='Quantity'>
                    {delay && <QuantityControls context={{preset, quantity, maxUnits}}/>}
                </AccordianWrap>
                <AccordianWrap heading='Background'>
                    {delay && <BackgroundControls context={{preset, background}}/>}
                </AccordianWrap>
                <AccordianWrap heading='Pattern'>
                    {delay && <PatternControls context={{preset, pattern}}/> }
                 </AccordianWrap>            
                <AccordianWrap heading='Shadow'>
                    {delay && <ShadowControls context={{preset, shadow}}/>}
                </AccordianWrap>
            </div>
        </Drawer>         
    );
}

