import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.background.default,
        display:'flex',
        width:'100%',
        height:'100%',
        overflow:'auto'
    }
}))

export default function Create() {
    const classes = styles();

    return (
        <Box 
            id='hometabpanel-1'
            aria-labelledby='hometab-1'
            className={classes.box} 
        >
          
        </Box>
    );
}