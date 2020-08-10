import React from 'react'
import Box from '@material-ui/core/Box'
import Canvas from '../Canvas/Canvas'
import {makeStyles} from '@material-ui/core/styles'
import GroupA from './Groups/GroupA'
import GroupB from './Groups/GroupB'

const styles = makeStyles(theme => ({
    purpleGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: .95,
        background: `linear-gradient(to top, ${theme.palette.primary.dark}, ${theme.palette.primary.dark} 15%, transparent 70%)`
    },
    blackGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: .95,
        background: `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent 85%)`
    },
    
}))

export default function Landing(){
    const classes = styles(); 

    return (
        <Box display='flex' minHeight='568px' width='100%' height='100%' justifyContent='space-evenly' flexDirection={'column'}>
            <Box minHeight='568px' width='100%' height='100%' position='absolute'>
                <Canvas/>
            </Box>
            <Box minHeight='568px' className={classes.blackGradient}/>
            <Box minHeight='568px' className={classes.purpleGradient}/>
            <GroupA/>
            <GroupB/>
        </Box>
    )
}