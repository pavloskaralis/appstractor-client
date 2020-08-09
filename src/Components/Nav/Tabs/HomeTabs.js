import React, { useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabContext from '../../../Contexts/TabContext'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import CreateIcon from '@material-ui/icons/Create'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';

function a11yProps(index) {
    return {
      id: `hometab-${index}`,
      'aria-controls': `hometabpanel-${index}`,
    };
}

export default function HomeTabs(){
    const {tabValue, handleTabChange} = useContext(TabContext)
    const matches = useMediaQuery('(min-width:600px)');

    const create = <Tooltip title="Create" aria-label="create"><CreateIcon/></Tooltip>
    const gallery = <Tooltip title="Gallery" aria-label="gallery"><PhotoLibraryIcon/></Tooltip>

    return (     
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
        >
            <Tab icon={matches ? 'Create' : create} {...a11yProps(0)}/>
            <Tab icon={matches ? 'Gallery' : gallery} {...a11yProps(1)}/>
        </Tabs>   
    )
}


