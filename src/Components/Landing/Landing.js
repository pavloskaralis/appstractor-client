import React, { useEffect, useState } from 'react'
import Canvas from '../Canvas/Canvas'
import {makeStyles} from '@material-ui/core/styles'
import GroupA from './Groups/GroupA'
import GroupB from './Groups/GroupB'
import defaultImage from '../../Styles/defaultImage.jpeg'
import {useDispatch} from 'react-redux'
import setImage from '../../Actions/Canvas/setImage'
import setSnackbar from '../../Actions/Interface/setSnackbar'

const styles = makeStyles(theme => ({
    container: {
        backgroundImage: `url(${defaultImage})`,
        display:'flex', 
        minHeight:'568px', 
        width:'100vw', 
        height:'100vh', 
        justifyContent:'space-evenly',
        flexDirection:'column',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    purpleGradient: {
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        opacity: .90,
        background: `linear-gradient(to top, ${theme.palette.primary.dark}, ${theme.palette.primary.dark} 15%, transparent 70%)`
    },
    blackGradient: {
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        opacity: .85,
        background: `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent 85%)`
    },
    
}))

export default function Landing(){
    const classes = styles(); 
    const dispatch = useDispatch();
    const [isChrome] = useState(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));

    //set demo/landing image on load
    useEffect(()=> {
        if(!isChrome){
            dispatch(setSnackbar({success: false, message: 'Site requires chrome browser.'}))
        }
        dispatch(setImage({small: defaultImage, medium: defaultImage}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <div className={classes.container}>
            <div style={{zIndex:0, minHeight:'568px', width:'100vw', height:'100vh', position:'absolute'}}>
                <Canvas/>
            </div>
            <div style={{minHeight:'568px'}} className={classes.blackGradient}/>
            <div style={{minHeight:'568px'}} className={classes.purpleGradient}/>
            <GroupA/>
            <GroupB/>
        </div>
    )
}