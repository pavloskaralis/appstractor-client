import React, { useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabContext from '../../../Contexts/TabContext'
import ViewportContext from '../../../Contexts/ViewportContext'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import CreateIcon from '@material-ui/icons/Create'
import Tooltip from '@material-ui/core/Tooltip'

function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
}



export default function HomeTabs(){
    const viewportWidth = useContext(ViewportContext);
    
    const create = <Tooltip title="Create" aria-label="create"><CreateIcon/></Tooltip>
    const gallery = <Tooltip title="Gallery" aria-label="gallery"><PhotoLibraryIcon/></Tooltip>

    const {tabValue, handleTabChange} = useContext(TabContext)
    return (     
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
        >
            <Tab icon={viewportWidth >= 600 ? 'Create' : create} {...a11yProps(0)}/>
            <Tab icon={viewportWidth >= 600 ? 'Gallery' : gallery} {...a11yProps(1)}/>
        </Tabs>   
    )
}


