import React, { useState, useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Canvas from '../../Canvas/Canvas'
import CanvasContainer from './CanvasContainer/CanvasContainer'
import CanvasSpinner from './CanvasSpinner/CanvasSpinner'
import CreateDrawer from './CreateDrawer/CreateDrawer'
import CreateTabs from './CreateTabs/CreateTabs'
import {makeStyles} from '@material-ui/core/styles'
import { useSelector }from 'react-redux'
import EmptyCanvas from './EmptyCanvas/EmptyCanvas'
import CanvasLoader from './CanvasLoader/CanvasLoader'
import LinkDialog from './LinkDialog/LinkDialog'
import SearchDialog from './SearchDialog/SearchDialog'
import SaveDialog from './SaveDialog/SaveDialog'
import Capture from '../../Capture/Capture'
import { isLoaded, isEmpty } from 'react-redux-firebase'

const styles = makeStyles(theme => ({
    page: {
        display:'flex', 
        width:'100%',
        height:'100vh',
        flexDirection: 'column',
        overflow: 'auto',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    artboard:{
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height:'100%',
        width:'100%', 
        overflow:'auto',
        flexDirection:'column',
        justifyContent: 'center',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
        minHeight: '232px'
        },
        [theme.breakpoints.up(780)]: {
        minHeight: '332px'
        },
        [theme.breakpoints.up('md')]: {
        minHeight: '432px',
        },
        [theme.breakpoints.up('lg')]: {
        minHeight: '632px',
        },
        '@media (max-height: 696px) and (min-width:960px)': {
            minHeight: '432px',
        },
        '@media (max-height: 496px) and (min-width: 600px)': {
            minHeight: '332px',
        },
    }
}))

export default function Create() {
    const classes = styles();
    const auth = useSelector(state => state.firebase.auth)
    const image = useSelector(state => state.canvas.image)

    const {rendering, loading, edit, capture} = useSelector(state => state.interface);
    const [delay, toggleDelay] = useState(false);
    //must create 2; negative matches cause memory leak warning
    const matchesA = useMediaQuery('(min-width:600px)');
    const matchesB = useMediaQuery('(max-width:599px)');

    //improve page load
    useEffect(()=> {
        //dont allow dialogs to mount during demo; prevents firestore error
        if(isLoaded(auth) && !isEmpty(auth)) {
            setTimeout(()=> toggleDelay(true),350)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        //search, link, and save must stay mounted for transition effects
        <div 
            id='hometabpanel-0'
            aria-labelledby='hometab-0'
            className={classes.page} 
        >
            {matchesA && <CreateDrawer/>}
            <div className={classes.artboard} style={{zIndex: capture ? 1205 : 1}}>
                <CanvasContainer>
                    <Canvas/>
                    {rendering && (image || edit) && <CanvasSpinner/>}
                    {loading && <CanvasLoader/>}
                    {!image && !loading && <EmptyCanvas/>}
                    {delay && <LinkDialog/>}
                    {delay && <SaveDialog/>}
                </CanvasContainer>
                {delay && matchesA && <SearchDialog/>}
            </div> 
            {delay && matchesB && <SearchDialog/>}
            {matchesB && <CreateTabs/>}
            {capture && <Capture/>}
        </div>
    );
}
