import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';



const styles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.paper,
        width: '100%', 
        height:'291px',
        justifyContent: 'center',
    },
    heading: {
      padding: '16px 16px 12px 16px',
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
      // background: theme.palette.primary.main
    }
}));

export default function CreatePanel({heading, children, value, index, ...other }) {
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
              {heading !== 'Render' && <Typography className={classes.heading}>{heading}</Typography>}
              <Box width='100%' padding={heading === 'Render' ? '16px' : '0 16px 16px 16px'} display='flex' flexDirection='column'>
                {children}
              </Box>
            </Box>
            <Toolbar/>
        </Box>
      </Box>
    );
}