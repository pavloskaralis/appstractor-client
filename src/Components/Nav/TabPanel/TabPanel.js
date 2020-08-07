import React, { useContext } from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import ViewportContext from '../../../Contexts/ViewportContext'

const styles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.default,
        width: '100%', 
        height: '100%'
    },
}));

export default function TabPanel({ children, value, index, ...other }) {
    const classes = styles(); 
    const viewportWidth = useContext(ViewportContext);

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        className={classes.box}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        <Box display='flex' width='100%' height='100%' flexDirection={viewportWidth >= 600 ? 'row' : 'column'}>
            {children}
        </Box>
      </Box>
    );
}