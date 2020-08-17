import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Canvas from '../Canvas/Canvas'
import {makeStyles} from '@material-ui/core/styles'
import GroupA from './Groups/GroupA'
import GroupB from './Groups/GroupB'
import defaultImage from '../../Styles/defaultImage.jpeg'
import {useDispatch} from 'react-redux'
import setImage from '../../Actions/Canvas/setImage'

const styles = makeStyles(theme => ({
    purpleGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: .90,
        background: `linear-gradient(to top, ${theme.palette.primary.dark}, ${theme.palette.primary.dark} 15%, transparent 70%)`
    },
    blackGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: .85,
        background: `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent 85%)`
    },
    
}))

export default function Landing(){
    const classes = styles(); 
    const dispatch = useDispatch();

    //set demo/landing image on load
    useEffect(()=> {
        dispatch(setImage(defaultImage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <Box display='flex' minHeight='568px' width='100%' height='100%' justifyContent='space-evenly' flexDirection={'column'}>
            <Box zIndex={0} minHeight='568px' width='100%' height='100%' position='absolute'>
                <Canvas/>
            </Box>
            <Box minHeight='568px' className={classes.blackGradient}/>
            <Box minHeight='568px' className={classes.purpleGradient}/>
            <GroupA/>
            <GroupB/>
        </Box>
    )
}