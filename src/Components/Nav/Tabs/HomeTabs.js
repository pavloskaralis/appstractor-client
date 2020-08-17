import React, { useState, useEffect } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import CreateIcon from '@material-ui/icons/Create'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useLocation, useHistory} from 'react-router-dom'
import {HOME, CREATE, GALLERY} from '../../../Routes/routes'

function a11yProps(index) {
    return {
      id: `hometab-${index}`,
      'aria-controls': `hometabpanel-${index}`,
    };
}

export default function HomeTabs(){
    const matches = useMediaQuery('(min-width:600px)');
    const {pathname} = useLocation();
    const history = useHistory();
    const [tabValue, setTabValue] = useState( {
        [HOME]: 0,
        [CREATE]: 0,
        [`${GALLERY.match(/\/\w+/)[0]}`]: 1
    }[pathname.match(/\/*\w*/)[0]])

    //tab value reset on path change 
    useEffect(()=>{
        setTabValue( {
            [HOME]: 0,
            [CREATE]: 0,
            [`${GALLERY.match(/\/\w+/)[0]}`]: 1
        }[pathname.match(/\/*\w*/)[0]])
    },[pathname])

    const create = <Tooltip title="Create" aria-label="create"><CreateIcon/></Tooltip>
    const gallery = <Tooltip title="Gallery" aria-label="gallery"><PhotoLibraryIcon/></Tooltip>

    const handleTabChange = (event, newTabValue) => {
        const route = {
            0: CREATE,
            1: GALLERY,
        }[newTabValue]

        history.push(route.match(/\/\w+/)[0])
    };
  
    return (     
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
        >
            <Tab icon={matches ? 'Create' : create}  {...a11yProps(0)}/>
            <Tab icon={matches ? 'Gallery' : gallery}  {...a11yProps(0)}/>
        </Tabs>   
    )
}


