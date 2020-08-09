import React, { useContext } from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.default,
        width: '100%', 
        height: '100%'
    },
}));

export default function TabPanel({ children, value, index, ...other }) {
    const classes = styles(); 
    const matches = useMediaQuery('(min-width:600px)');

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        className={classes.box}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        <Box display='flex' width='100%' height='100%' flexDirection={matches ? 'row' : 'column'}>
            {children}
        </Box>
      </Box>
    );
}