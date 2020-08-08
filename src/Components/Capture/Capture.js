import React from 'react'
import Box from '@material-ui/core/Box'
import Canvas from '../Canvas/Canvas'


export default function Capture () {
    return(
        <Box id='capture' zIndex={0} width='3600px' height='2400px' position='absolute'>
            <Canvas/>
        </Box>
    )
}

