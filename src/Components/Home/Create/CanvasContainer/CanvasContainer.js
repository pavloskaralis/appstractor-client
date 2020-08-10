import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const styles = makeStyles((theme) => ({
    canvasContainer: {
      position: 'relative',
      background: theme.palette.background.darkDefault,
      margin: '0 auto',
      [theme.breakpoints.up('xs')]: {
        width: '300px',
        height: '200px'
      },
      [theme.breakpoints.up(400)]: {
        width: '360px',
        height: '240px'
      },
      [theme.breakpoints.up(500)]: {
        width: '450px',
        height: '300px'
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
}));

function canvasContainer({children}) {
    const classes = styles();
        
    return (
        <Box boxShadow={3} className={classes.canvasContainer}>
            {children}
        </Box>
    );
}

export default canvasContainer;
