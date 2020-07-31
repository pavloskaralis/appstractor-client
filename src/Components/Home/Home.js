import React, {useContext} from 'react';
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
        backgroundColor: theme.palette.background.default
    }
}));

function Home() {
    const classes = styles();
    const {tabValue} = useContext(TabContext);

    return (
        <Box flexGrow={1} className={classes.box}>
            <TabPanel value={tabValue} index={0}>
              <Drawer
                  variant='permanent'
                  className={classes.drawer}
                  classes={{ paper: classes.drawerPaper }}
              >
              </Drawer>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              
            </TabPanel>
        </Box>
    );
}

export default Home;
