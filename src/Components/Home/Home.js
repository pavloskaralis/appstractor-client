import React, {useContext} from 'react';
import {useSelector} from 'react-redux'
import RenderDrawer from './RenderDrawer/RenderDrawer';
import {makeStyles} from '@material-ui/core/styles'
import TabContext from '../../Contexts/TabContext'
import Canvas from '../../Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import TabPanel from '../Nav/TabPanel'
import Spinner from './spinner.gif'

const styles = makeStyles((theme) => ({
    canvasContainer: {
      position: 'relative',
      background: theme.palette.background.darkPaper,
      margin: '0 auto',
      [theme.breakpoints.up('xs')]: {
        width: '3x',
        height: '2px'
      },
      [theme.breakpoints.up('sm')]: {
        width: '300px',
        height: '200px'
      },
      [theme.breakpoints.up(780)]: {
        width: '450px',
        height: '300px'
      },
      [theme.breakpoints.up('md')]: {
        width: '600px',
        height: '400px'
      },
      [theme.breakpoints.up('lg')]: {
        width: '900px',
        height: '600px'
      }
    },
    circularProgress: {
      margin: '0 auto',
      color: theme.palette.text.primary,
      // width: '60px !important',
      // height: '60px !important'
    }
}));

function Home() {
    const classes = styles();
    const {tabValue} = useContext(TabContext);
    const rendering = useSelector(state => state.render.rendering);
    
    return (
        <>
            <TabPanel value={tabValue} index={0}>
              <RenderDrawer/>
              <Box flexGrow={1} display='flex' height='100%'flexDirection='column' justifyContent='center'>
                <Box boxShadow={3} className={classes.canvasContainer}>
                  <Canvas/>
                  <Box position='absolute' zIndex={1} top={0} display='flex' width='100%' height='100%' flexDirection='column' justifyContent='center'>
                    {rendering && <img src={Spinner} style={{height: '100px', width: '100px', margin: '0 auto'}}/>}
                  </Box>
                </Box>
              </Box> 
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
            </TabPanel>
        </>
    );
}

export default Home;
