import React, { useState, useContext } from 'react'
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
import HomeButtons from './HomeNav/HomeButtons'
import HomeTabs from './HomeNav/HomeTabs'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles( theme => ({
    appBar: {
        zIndex: 1201,
    },
    buttonsToolbar: {
        paddingRight: '4px',
        [theme.breakpoints.up('sm')]: {
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

const buttons=<HomeButtons/>
const tabs=<HomeTabs/>

export default function Nav(){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

 
    return (
        <AppBar position='static' className={classes.appBar}>
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
                <MenuItem onClick={handleClose}>Feedback</MenuItem>
                <MenuItem onClick={handleClose}>Account</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
        </AppBar>
    )
}