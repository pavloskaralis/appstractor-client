import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'



const styles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.paper,
        width: '100%', 
        height:'258px',
        justifyContent: 'center',
    },
    accordionDetails: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.primary,
    }
}));

export default function CreatePanel({ children, value, index, ...other }) {
    const classes = styles(); 
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        className={classes.box}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        <Box  width='100%' height='100%'> 
            <Box width='278px' padding='0 18px' margin='0 auto'>
              <Box width='100%' padding='16px' display='flex' flexDirection='column'>
                {children}
              </Box>
            </Box>
            <Toolbar/>
        </Box>
      </Box>
    );
}