import React, { useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {makeStyles} from '@material-ui/core/styles'
import TabContext from '../../Contexts/TabContext'

const useStyles = makeStyles((theme) => ({
    tab: {
        minWidth: 80, // a number of your choice
        width: 80, // a number of your choice
        height: 64,
        minHeight: 64
    },
    indicator: {
        backgroundColor: theme.palette.primary.light
    }
}));

function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
}

export default function RenderTools(){
    const classes = useStyles();
    const {tabValue, handleTabChange} = useContext(TabContext)
    return (     
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label='Render and Gallery Tabs'
            classes={{indicator:classes.indicator}}
        >
            <Tab label='Render' {...a11yProps(0)} className={classes.tab}/>
            <Tab label='Gallery' {...a11yProps(1)} className={classes.tab}/>
        </Tabs>   
    )
}


