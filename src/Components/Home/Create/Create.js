import React from 'react'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Canvas from '../../Canvas/Canvas'
import CanvasContainer from './CanvasContainer/CanvasContainer'
import CanvasSpinner from './CanvasSpinner/CanvasSpinner'
import CreateDrawer from './CreateDrawer/CreateDrawer'
import CreateTabs from './CreateTabs/CreateTabs'
import {makeStyles} from '@material-ui/core/styles'
import { useSelector }from 'react-redux'
import EmptyCanvas from './EmptyCanvas/EmptyCanvas'
import CanvasLoader from './CanvasLoader/CanvasLoader'
import LinkDialog from './LinkDialog/LinkDialog'
import SearchDialog from './SearchDialog/SearchDialog'

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
        position: 'relative',
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
        '@media (max-height: 688px) and (min-width:960px)': {
            minHeight: '432px',
        },
    }
}))

export default function Create() {
    const classes = styles();
    const image = useSelector(state => state.canvas.image)
    const {rendering, loading, searchDialog, linkDialog} = useSelector(state => state.interface);

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
                    {rendering && image && <CanvasSpinner/>}
                    {loading && <CanvasLoader/>}
                    {!image && <EmptyCanvas/>}
                    {linkDialog && <LinkDialog/>}
                </CanvasContainer>
                {true && <SearchDialog/>}
            </Box> 
            {matchesB && <CreateTabs/>}
        </Box>
    );
}