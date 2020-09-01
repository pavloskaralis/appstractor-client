import React from 'react';
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles((theme) => ({
    canvasContainer: {
      background: theme.palette.background.darkDefault,
      margin: theme.spacing(2, 'auto'),
      position: 'relative',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      flexShrink: 0, 
      [theme.breakpoints.up('xs')]: {
        width: '300px',
        height: '200px',
        minHeight: 200
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
        height: '400px',
      },
      [theme.breakpoints.up('lg')]: {
        width: '900px',
        height: '600px',
      },
      '@media (max-height: 696px) and (min-width:960px)': {
        width: '600px',
        height: '400px',
      },
      '@media (max-height: 496px) and (min-width: 600px)': {
        width: '300px',
        height: '200px'
      },
      '@media (max-height: 664px) and (min-width: 500px) and (max-width: 600px)': {
        width: '360px',
        height: '240px'
      },
      '@media (max-height: 604px) and (min-width: 400px) and (max-width: 600px)': {
        width: '300px',
        height: '200px'
      },
    },
}));

function canvasContainer({children}) {
    const classes = styles();
        
    return (
        <div className={classes.canvasContainer}>
            {children}
        </div>
    );
}

export default canvasContainer;
