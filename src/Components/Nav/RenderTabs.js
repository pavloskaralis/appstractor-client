import React, { useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabContext from '../../Contexts/TabContext'


function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
}

export default function RenderTools(){
    const {tabValue, handleTabChange} = useContext(TabContext)
    return (     
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label='Render and Gallery Tabs'
        >
            <Tab label='Render' {...a11yProps(0)} />
            <Tab label='Gallery' {...a11yProps(1)} />
        </Tabs>   
    )
}


