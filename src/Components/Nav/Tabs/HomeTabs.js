import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import CreateIcon from '@material-ui/icons/Create'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useLocation, useHistory} from 'react-router-dom'

function a11yProps(index) {
    return {
      id: `hometab-${index}`,
      'aria-controls': `hometabpanel-${index}`,
    };
}

export default function HomeTabs(){
    const matches = useMediaQuery('(min-width:600px)');
    const location = useLocation();
    const history = useHistory();

    const tabValue = {
        'create': 0,
        'gallery': 1
    }[location.pathname.split('/')[1]]

    const create = <Tooltip title="Create" aria-label="create"><CreateIcon/></Tooltip>
    const gallery = <Tooltip title="Gallery" aria-label="gallery"><PhotoLibraryIcon/></Tooltip>

    const handleTabChange = (event, newTabValue) => {
        const route = {
            0: '/create',
            1: '/gallery'
        }[newTabValue]

        history.push(route)
    };
  
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


