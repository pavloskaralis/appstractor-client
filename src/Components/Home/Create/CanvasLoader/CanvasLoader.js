import React from 'react';
import {useSelector} from 'react-redux'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'

export default function CanvasLoader() {
    const {progress} = useSelector(state => state.interface);
   
    return (    
        <Box position='absolute' zIndex={2} top={0} display='flex' width='100%' height='100%' flexDirection='column' justifyContent='center'>
            <Box width='50%' margin='0 auto'>
                <LinearProgress  variant='determinate' value={progress}/>
            </Box>
        </Box>        
    );
}

