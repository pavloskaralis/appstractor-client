import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import grey from '@material-ui/core/colors/grey'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import Logo from './logo.svg'
import {makeStyles} from '@material-ui/core/styles'
import CreateTools from './Tools/CreateTools'
import HomeTabs from './Tabs/HomeTabs'
import Tooltip from '@material-ui/core/Tooltip'
import {useLocation} from 'react-router-dom'

const useStyles = makeStyles( theme => ({
    landingBar: {
        backgroundColor:'transparent',
        boxShadow:'none'
    },
    buttonsToolbar: {
        paddingRight: '4px',
        [theme.breakpoints.up(512)]: {
           paddingRight: '12px',
        }
    },
    menuToolbar: {
        paddingLeft: '4px',
        [theme.breakpoints.up('sm')]: {
           paddingLeft: '12px',
        }
    },
    iconButton: {
        [theme.breakpoints.up('sm')]: {
            marginRight: '12px',
        }
    },
    menuIcon: {
        color: theme.palette.text.primary
    }
}));

export default function Nav(){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const buttons={
        'create': <CreateTools/>,   
        'gallery': null, 
        'demo': null, 
        'signup': null, 
        'recover': null, 
        'login': null, 
        'feedback': null, 
        'account': null, 
        '404': null,
        '': null,
    }[location.pathname.split('/')[1]]

    const tabs={
        'create': <HomeTabs/>,   
        'gallery': <HomeTabs/>, 
        'demo': null, 
        'signup': null, 
        'recover': null, 
        'login': null, 
        'feedback': null, 
        'account': null, 
        '404': null,
        '': null,
    }[location.pathname.split('/')[1]]

 
    return (
        <AppBar position='static' className={true && location.pathname==='/' ? classes.landingBar : ''}>
            <Box display='flex' width='100%'>
                <Toolbar className={classes.buttonsToolbar}>
                    <IconButton className={classes.iconButton} edge='start' aria-label='menu'>
                        <Tooltip  title="Home" aria-label="home">
                            <Icon>
                                <img src={Logo} height={25} width={25} style={{ color: grey[50] }} alt='logo' />
                            </Icon>
                        </Tooltip>
                     </IconButton>
                    {buttons}
                </Toolbar>
                <Box flexGrow={1}/>
                {tabs}
                <Toolbar className={classes.menuToolbar}>
                    <IconButton edge='end' aria-label='menu' onClick={handleClick}>
                        <MenuIcon className={classes.menuIcon}/>
                    </IconButton>       
                </Toolbar>
            </Box>
            <Menu 
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Home</MenuItem>
                {false ? 
                    <>
                        <MenuItem onClick={handleClose}>Account</MenuItem>
                        <MenuItem onClick={handleClose}>Feedback</MenuItem>
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </>:
                    <>
                        <MenuItem onClick={handleClose}>Demo</MenuItem>
                        <MenuItem onClick={handleClose}>Signup</MenuItem>
                        <MenuItem onClick={handleClose}>Login</MenuItem>
                    </>
                }
            </Menu>
        </AppBar>
    )
}