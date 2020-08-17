import React from 'react'
import Box from '@material-ui/core/Box'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import ImageSelect from '../../../Nav/Tools/SubTools/ImageSelect';
const styles = makeStyles(theme => ({
    group: {
        position:'absolute', 
        top:'0', 
        height:'100%', 
        width:'100%', 
        display:'flex', 
        justifyContent:'center',
        flexDirection:'column',
        '& .MuiButtonGroup-root':{
            margin: '0 auto !important',
            zIndex: '1 !important',
        }
    }
}))

export default function EmptyCanvas(){
    const classes = styles(); 
    const loading = useSelector(state => state.interface.loading)
    return (
        <Box className={classes.group} >
            {!loading && <ImageSelect/>}
        </Box>
    )

}