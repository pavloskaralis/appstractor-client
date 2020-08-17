import React from 'react';
import Box from '@material-ui/core/Box'
import spinnerGif from './spinner.gif'

export default function CanvasSpinner({height = '40px', width = '40px'}) {
    const spinnerStyle = {
        height: height, 
        width: width, 
        margin: '0 auto',
        opacity: .9
    }

    return (    
        <Box position='absolute' zIndex={1} top={0} display='flex' width='100%' height='100%' flexDirection='column' justifyContent='center'>
            <img alt='loading spinner' src={spinnerGif} style={spinnerStyle}/>
        </Box>        
    );
}

