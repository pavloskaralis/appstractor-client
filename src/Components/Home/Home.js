import React, {useContext} from 'react';
import Canvas from '../../Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import RenderDrawer from './RenderDrawer';
import {makeStyles} from '@material-ui/core/styles'
import TabContext from '../../Contexts/TabContext'
import TabPanel from '../Nav/TabPanel'

const styles = makeStyles((theme) => ({
    canvasContainer: {
      background: theme.palette.background.paper,
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
    }
}));

function Home() {
    const classes = styles();
    const {tabValue} = useContext(TabContext);
    return (
        <>
            <TabPanel value={tabValue} index={0}>
              <RenderDrawer/>
              <Box flexGrow={1} display='flex' height='100%'flexDirection='column' justifyContent='center'>
                <Box boxShadow={3} className={classes.canvasContainer}>
                  <Canvas/>
                </Box>
              </Box> 
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
            </TabPanel>
        </>
    );
}

export default Home;
