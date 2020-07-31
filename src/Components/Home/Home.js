import React from 'react';
import Canvas from '../../Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles'


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

    return (
        <Box flexGrow={1} className={classes.box}>
            <Drawer
                variant='permanent'
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
            >
            </Drawer>
         
        </Box>
    );
}

export default Home;
