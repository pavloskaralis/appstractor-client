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
      },
      '@media (max-height: 744px) and (min-width: 960px) ':{
        width: '600px',
        height: '400px'
      },
      '@media (max-height: 544px) and (min-width: 780px) ':{
        width: '450px',
        height: '300px'
      },
      '@media (max-height: 444px) and (min-width: 600px) ':{
        width: '300px',
        height: '200px'
      },
      '@media (max-height: 702px) and (min-width: 500px) ':{
        width: '360px',
        height: '240px'
      },
      '@media (max-height: 642px) and (min-width: 400px) ':{
        width: '300px',
        height: '200px'
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
