import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Photo from './Photo/Photo'

const styles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.background.default,
        display:'flex',
        width:'100%',
        height:'100%',
        overflow:'auto',
        flexDirection: 'column'
    },
    container: {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between',
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(3, 1),
        [theme.breakpoints.up('sm')]:{
            maxWidth: 600,
        },
        [theme.breakpoints.up('md')]:{
            maxWidth: 960
        }
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
            <Box className={classes.container}>
                <Photo/>
                <Photo/>
                <Photo/>
                <Photo/>
                <Photo/>
                <Photo/>
            </Box>
        </Box>
    );
}