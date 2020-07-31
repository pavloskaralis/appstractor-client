import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'


const styles = makeStyles((theme) => ({
    outerBox: {
        backgroundColor: theme.palette.background.default,
        width: '100%', 
        height: '100%'
    },
    innerBox: {
        height: '100%',
        width: '100%'
    }
}));

export default function TabPanel({ children, value, index, ...other }) {
    const classes = styles(); 
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        className={classes.outerBox}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        <Box display='flex' className={classes.innerBox}>
            {children}
        </Box>
      </Box>
    );
}