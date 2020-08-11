import React, { useEffect, useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import CreateIcon from '@material-ui/icons/Create'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useLocation, useHistory} from 'react-router-dom'
import {CREATE, GALLERY} from '../../../Routes/routes'


export default function HomeTabs(){
    const matches = useMediaQuery('(min-width:600px)');
    const {pathname} = useLocation();
    const history = useHistory();
    const [tabValue, setTabValue] = useState( {
        [CREATE]: 0,
        [GALLERY]: 1
    }[pathname.match(/\/\w+/)[0]])


    const create = <Tooltip title="Create" aria-label="create"><CreateIcon/></Tooltip>
    const gallery = <Tooltip title="Gallery" aria-label="gallery"><PhotoLibraryIcon/></Tooltip>

    const handleTabChange = (event, newTabValue) => {

        setTabValue(newTabValue);
        const route = {
            0: CREATE,
            1: GALLERY,
        }[newTabValue]

        history.push(route.match(/\/\w+/)[0])
    };
  
    useEffect(()=>{
        console.log(pathname.match(/\/\w+/)[0])
        console.log(tabValue)
    })
    return (     
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
        >
            <Tab icon={matches ? 'Create' : create} />
            <Tab icon={matches ? 'Gallery' : gallery} />
        </Tabs>   
    )
}


