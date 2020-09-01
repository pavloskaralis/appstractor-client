import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';



const styles = makeStyles((theme) => ({
    container: {
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
      <div
        role="tabpanel"
        hidden={value !== index}
        className={classes.container}
        id={`createtabpanel-${index}`}
        aria-labelledby={`createtab-${index}`}
        {...other}
      >
        <div style={{ width:'100%', height:'220px'}}> 
            <div style={{width:'276px', padding:'0 16px', margin:'0 auto'}}>
              {heading !== 'Render' && <Typography className={classes.heading}>{heading}</Typography>}
              <div style={{width:'100%', padding:'16px', display:'flex', flexDirection:'column'}}>
                {children}
              </div>
            </div>
        </div>
      </div>
    );
}