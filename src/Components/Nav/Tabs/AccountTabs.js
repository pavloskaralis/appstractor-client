import React, {useState} from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useLocation, useHistory} from 'react-router-dom'
import {ACCOUNT, ACCOUNT_EMAIL,ACCOUNT_PASSWORD,ACCOUNT_DELETE} from '../../../Routes/routes'


export default function AccountTabs(){
    const matches = useMediaQuery('(min-width:600px)');

    const {pathname} = useLocation();
    const history = useHistory();
    const [tabValue, setTabValue] = useState( {
        [ACCOUNT]: 0,
        [ACCOUNT_EMAIL]: 0,
        [ACCOUNT_PASSWORD]: 1,
        [ACCOUNT_DELETE]: 2,
    }[pathname.match(/\/account(\/\w+)?/)[0]])

       
    const email = <Tooltip title="Email" aria-label="email"><EmailIcon/></Tooltip>
    const password = <Tooltip title="Password" aria-label="password"><LockIcon/></Tooltip>
    const deleteAccount = <Tooltip title="Delete" aria-label="delete"><DeleteForeverIcon/></Tooltip>

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);

        const route = {
            0: ACCOUNT_EMAIL,
            1: ACCOUNT_PASSWORD,
            2: ACCOUNT_DELETE,
        }[newTabValue]

        history.push(route)
    };
  
    return (     
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
        >
            <Tab icon={matches ? 'Email' : email}/>
            <Tab icon={matches ? 'Password' : password}/>
            <Tab icon={matches ? 'Delete' : deleteAccount}/>
        </Tabs>   
    )
}


