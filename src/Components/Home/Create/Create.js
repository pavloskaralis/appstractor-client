import React from 'react'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Canvas from '../../Canvas/Canvas'
import CanvasContainer from './CanvasContainer/CanvasContainer'
import CanvasSpinner from './CanvasSpinner/CanvasSpinner'
import CreateDrawer from './CreateDrawer/CreateDrawer'
import CreateTabs from './CreateTabs/CreateTabs'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
    page: {
        backgroundColor: theme.palette.background.default,
        display:'flex', 
        width:'100%',
        height:'100%',
        flexDirection: 'column',
        overflow: 'auto',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    artboard:{
        display: 'flex',
        height:'100%',
        width:'100%', 
        overflow:'auto',
        flexDirection:'column',
        justifyContent: 'center',

        [theme.breakpoints.up('sm')]: {
        minHeight: '232px'
        },
        [theme.breakpoints.up(780)]: {
        minHeight: '332px'
        },
        [theme.breakpoints.up('md')]: {
        minHeight: '432px',
        },
        [theme.breakpoints.up('lg')]: {
        minHeight: '632px',
        },
    }
}))

export default function Create() {
    const classes = styles();
    //must create 2; negative matches cause memory leak warning
    const matchesA = useMediaQuery('(min-width:600px)');
    const matchesB = useMediaQuery('(max-width:599px)');
 
    return (
        <Box 
            id='hometabpanel-0'
            aria-labelledby='hometab-0'
            className={classes.page} 
        >
            {matchesA && <CreateDrawer/>}
            <Box 
                className={classes.artboard}               
            >
                <CanvasContainer>
                    <Canvas/>
                    <CanvasSpinner/>
                </CanvasContainer>
            </Box> 
            {matchesB && <CreateTabs/>}
        </Box>
    );
}