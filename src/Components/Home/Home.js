import React, {useContext, useEffect, useRef, useState} from 'react';
import Canvas from '../../Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles'
import TabContext from '../../Contexts/TabContext'
import TabPanel from './TabPanel'

const styles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    box: {
      height: '100%',
    }
}));

function Home() {
    const classes = styles();
    const {tabValue} = useContext(TabContext);
    const [canvasWidth, setCanvasWidth] = useState();

    function getCanvasWidth(){
      const clientWidth = window.innerWidth;
      console.log(clientWidth)
      if(clientWidth > 1920) {
        return 1200
      } else if (clientWidth > 1280) {
        return 900
      } else if (clientWidth > 960) {
        return 600
      } else if (clientWidth > 780) {
        return 450
      } else if (clientWidth > 600) {
        return 300
      } else {
        return 3
      }
    }
    useEffect(()=> {
      setCanvasWidth(getCanvasWidth())
      window.addEventListener('resize', ()=> {
        setCanvasWidth(getCanvasWidth())
      },[])
    },[])

    return (
        <>
            <TabPanel value={tabValue} index={0}>
              <Drawer
                  variant='permanent'
                  className={classes.drawer}
                  classes={{ paper: classes.drawerPaper }}
              >
              </Drawer>
              <Box flexGrow={1} display='flex' className={classes.box} flexDirection='column' justifyContent='center'>
                <Canvas canvasWidth={canvasWidth}/>
              </Box> 
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                test2
            </TabPanel>
        </>
    );
}

export default Home;
