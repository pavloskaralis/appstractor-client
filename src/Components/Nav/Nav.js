import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import Logo from './logo.png'
import {makeStyles} from '@material-ui/core/styles'
import CreateTools from './Tools/CreateTools'
import HomeTabs from './Tabs/HomeTabs'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import AccountTabs from './Tabs/AccountTabs'
import GalleryTools from './Tools/GalleryTools'
import {useLocation, Link as RouterLink} from 'react-router-dom'
import * as ROUTES from '../../Routes/routes'
import {useSelector} from 'react-redux'
import {isEmpty, useFirebase} from 'react-redux-firebase'
import EditTools from './Tools/EditTools'

const useStyles = makeStyles( theme => ({
    landingBar: {
        backgroundColor:'transparent',
        boxShadow:'none'
    },
    buttonsToolbar: {
        paddingRight: 0,
        flexGrow: 1,
    },
    menuToolbar: {
        paddingLeft: 0,
        [theme.breakpoints.up('sm')]: {
           paddingLeft: theme.spacing(1.5),
        }
    },
    menuIcon: {
        color: theme.palette.text.primary
    },
    title:{
        fontWeight: theme.typography.h6.fontWeight,
        fontSize: theme.typography.pxToRem(16),
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.h6.fontSize,
            margin: theme.spacing(0,1.5)
        }
    },
    icon:{
        marginRight: theme.spacing(1)
    }

}));

export default function Nav(){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const {pathname} = useLocation();
    const auth = useSelector(state => state.firebase.auth)
    const firebase = useFirebase();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose();
        firebase.logout();
    }


    const buttons={
        '': isEmpty(auth) ? '' : <CreateTools/>,
        'privacy_policy': <Typography className={classes.title}>Privacy Policy</Typography> ,
        'terms_of_service': <Typography className={classes.title}>Terms of Service</Typography> ,
        'create': <CreateTools/>,   
        'gallery': <GalleryTools/>, 
        'edit':  <EditTools title={pathname.split('/')[2]}/>, 
        'demo':  <Typography className={classes.title}>Demo</Typography>, 
        'signup':  <Typography className={classes.title}>Signup</Typography>, 
        'recover': <Typography className={classes.title}>Account Recovery</Typography>, 
        'login':   <Typography className={classes.title}>Login</Typography>, 
        'feedback': <Typography className={classes.title}>Feedback</Typography>, 
        'account':  <Typography className={classes.title}>Account</Typography>, 
        '404':   <Typography className={classes.title}>404 Error</Typography>,
        'view': <Typography className={classes.title}>{pathname.split('/')[3]}</Typography>,
    }[pathname.split('/')[1]]

    const tabs={
        '': isEmpty(auth) ? '' : <HomeTabs/>,
        'create': <HomeTabs/>,   
        'gallery': <HomeTabs/>, 
        'account': <AccountTabs/>, 
    }[pathname.split('/')[1]]

 
    return (
        <AppBar position={isEmpty(auth) && pathname==='/' ? 'fixed' : 'static'} className={isEmpty(auth) && pathname==='/' ? classes.landingBar : ''}>
            <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                <Toolbar className={classes.buttonsToolbar}>
                    <IconButton component={RouterLink} to={ROUTES.HOME} edge='start' aria-label='menu'>
                        <Tooltip  title="Home" aria-label="home">
                            <Icon>
                                <img src={Logo} height={25} width={25} alt='logo' />
                            </Icon>
                        </Tooltip>
                     </IconButton>
                    {buttons}
                </Toolbar>
                {tabs}
                <Toolbar className={classes.menuToolbar}>
                    <IconButton edge='end' aria-label='menu' onClick={handleClick}>
                        <MenuIcon className={classes.menuIcon}/>
                    </IconButton>       
                </Toolbar>
            </div>
          
            {isEmpty(auth) ? 
                <Menu 
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem value={ROUTES.HOME} component={RouterLink} to={ROUTES.HOME} onClick={handleClose} selected={pathname === ROUTES.HOME}>
                        Home
                    </MenuItem>
                    <MenuItem component={RouterLink} to={ROUTES.DEMO} onClick={handleClose} selected={pathname === ROUTES.DEMO}>
                        Demo
                    </MenuItem>
                    <MenuItem component={RouterLink} to={ROUTES.SIGNUP} onClick={handleClose} selected={pathname === ROUTES.SIGNUP}>
                        Signup
                    </MenuItem>
                    <MenuItem component={RouterLink} to={ROUTES.LOGIN} onClick={handleClose} selected={pathname === ROUTES.LOGIN}>
                        Login
                    </MenuItem>
                </Menu>:
                <Menu 
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem component={RouterLink} to={ROUTES.HOME} onClick={handleClose} selected={pathname === ROUTES.HOME}>
                        Home
                    </MenuItem>
                    <MenuItem component={RouterLink} to={ROUTES.ACCOUNT} onClick={handleClose }selected={pathname === ROUTES.ACCOUNT}>
                        Account
                    </MenuItem>
                    <MenuItem component={RouterLink} to={ROUTES.FEEDBACK} onClick={handleClose} selected={pathname === ROUTES.FEEDBACK }>
                        Feedback
                    </MenuItem>
                    <MenuItem component={RouterLink} to={ROUTES.HOME} onClick={logout}>
                        Log Out
                    </MenuItem>
                </Menu>
            }
        </AppBar>
    )
}