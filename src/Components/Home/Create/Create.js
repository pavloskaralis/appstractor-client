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
    box: {
        backgroundColor: theme.palette.background.default,
    }
}))

export default function Create() {
    const classes = styles();
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Box className={classes.box} display='flex' width='100%' height='100%' flexDirection={matches ? 'row' : 'column'}>
            {matches && <CreateDrawer/>}
            <Box flexGrow={1} display='flex' height='100%' width='100%' flexDirection='column' justifyContent='center'>
                <CanvasContainer>
                    <Canvas/>
                    <CanvasSpinner/>
                </CanvasContainer>
            </Box> 
            {!matches && <CreateTabs/>}
        </Box>
    );
}