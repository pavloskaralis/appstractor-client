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
import Typography from '@material-ui/core/Typography'
import {useLocation, Link as RouterLink} from 'react-router-dom'
import * as ROUTES from '../../Routes/routes'

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
    const {pathname} = useLocation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const buttons={
        'create': <CreateTools/>,   
        'gallery': null, 
        'demo':  <Typography variant="h5">Demo</Typography>, 
        'signup':  <Typography variant="h6">Signup</Typography>, 
        'recover': <Typography variant="h6">Password Recovery</Typography>, 
        'login':   <Typography variant="h6">Login</Typography>, 
        'feedback': <Typography variant="h6">Feedback</Typography>, 
        'account':  <Typography variant="h6">Account</Typography>, 
        '404':   <Typography variant="h6">404 Error</Typography>,
    }[pathname.split('/')[1]]

    const tabs={
        'create': <HomeTabs/>,   
        'gallery': <HomeTabs/>, 
        'account': null, 
    }[pathname.split('/')[1]]

 
    return (
        <AppBar position={true && pathname==='/' ? 'fixed' : 'static'} className={true && pathname==='/' ? classes.landingBar : ''}>
            <Box display='flex' width='100%'>
                <Toolbar className={classes.buttonsToolbar}>
                    <IconButton component={RouterLink} to={ROUTES.HOME} className={classes.iconButton} edge='start' aria-label='menu'>
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
                <MenuItem component={RouterLink} to={ROUTES.HOME} onClick={handleClose}>Home</MenuItem>
                {false ? 
                    <>
                        <MenuItem component={RouterLink} to={ROUTES.ACCOUNT} onClick={handleClose}>Account</MenuItem>
                        <MenuItem component={RouterLink} to={ROUTES.FEEDBACK} onClick={handleClose}>Feedback</MenuItem>
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </>:
                    <>
                        <MenuItem component={RouterLink} to={ROUTES.DEMO} onClick={handleClose}>Demo</MenuItem>
                        <MenuItem component={RouterLink} to={ROUTES.SIGNUP} onClick={handleClose}>Signup</MenuItem>
                        <MenuItem component={RouterLink} to={ROUTES.LOGIN} onClick={handleClose}>Login</MenuItem>
                    </>
                }
            </Menu>
        </AppBar>
    )
}