import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    buttonsToolbar: {
        flexGrow: 1,
        paddingRight: '0'
    },
    menuToolbar: {
        paddingLeft: '12px'
    },
    iconButton: {
        marginRight: '12px'
    }
});

export default function Nav({buttons,tabs}){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
 
    return (
        <AppBar position='static'>
            <Box display='flex' width='100%'>
                <Toolbar classes={{root: classes.buttonsToolbar}}>
                    <IconButton classes={{root: classes.iconButton}} edge='start' aria-label='menu'>
                        <DashboardIcon/>
                    </IconButton>
                    {buttons}
                </Toolbar>
                {tabs}
                <Toolbar classes={{root: classes.menuToolbar}}>
                    <IconButton edge='end' aria-label='menu' onClick={handleClick}>
                        <MenuIcon />
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