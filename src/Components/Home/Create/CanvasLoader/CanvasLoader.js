import React from 'react';
import {useSelector} from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'

export default function CanvasLoader() {
    const progress = useSelector(state => state.interface.progress);
   
    return (    
        <div style={{position:'absolute', zIndex:2, top:0, display:'flex', width:'100%', height:'100%', flexDirection:'column', justifyContent:'center'}}>
            <div style={{width:'50%', margin:'0 auto'}}>
                <LinearProgress  variant='determinate' value={progress}/>
            </div>
        </div>        
    );
}

