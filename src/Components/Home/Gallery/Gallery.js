import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Photo from './Photo/Photo'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BottomNavagation from '@material-ui/core/BottomNavigation'
import SearchBar from '../../Nav/Tools/SubTools/SearchBar'

const styles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.background.default,
        display:'flex',
        width:'100%',
        height:'100%',
        overflow:'auto',
        flexDirection: 'column'
    },
    photoContainer: {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between',
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(3, 1),
        overflow:'auto',
        [theme.breakpoints.up('sm')]:{
            maxWidth: 600,
            overflow: 'initial'
        },
        [theme.breakpoints.up('md')]:{
            maxWidth: 960
        }
    },
    bottomNav: {
        flexShrink: 0,
    }
}))

export default function Create() {
    const classes = styles();
    const matches = useMediaQuery('(max-width:599px)');

    return (
        <Box 
            id='hometabpanel-1'
            aria-labelledby='hometab-1'
            className={classes.box} 
        >
            <Box className={classes.photoContainer}>
                <Photo/>
                <Photo/>
                <Photo/>
                <Photo/>
                <Photo/>
                <Photo/>
            </Box>
            {matches && 
                <BottomNavagation className={classes.bottomNav}> 
                    <SearchBar/>
                </BottomNavagation>
            }
        </Box>
    );
}
