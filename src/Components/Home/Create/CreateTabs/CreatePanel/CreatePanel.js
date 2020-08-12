import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';



const styles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.paper,
        width: '100%', 
        height:'220px',
        justifyContent: 'center',
    },
    heading: {
      padding: theme.spacing(2, 2, 0, 2),
      marginBottom: theme.spacing(-.5),
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
    }
}));

export default function CreatePanel({heading, children, value, index, ...other }) {
    const classes = styles(); 
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        className={classes.box}
        id={`createtabpanel-${index}`}
        aria-labelledby={`createtab-${index}`}
        {...other}
      >
        <Box  width='100%' height='100%'> 
            <Box width='278px' padding='0 16px' margin='0 auto'>
              {heading !== 'Render' && <Typography className={classes.heading}>{heading}</Typography>}
              <Box width='100%' padding='16px' display='flex' flexDirection='column'>
                {children}
              </Box>
            </Box>
        </Box>
      </Box>
    );
}