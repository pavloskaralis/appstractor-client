import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import GetAppIcon from '@material-ui/icons/GetApp'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchBar from './SubTools/SearchBar'

const styles = makeStyles(theme => ({
    iconButton: {
         color: theme.palette.text.primary,
    }, 
    group: {
        maxHeight: 30,
        [theme.breakpoints.up('sm')]:{
            marginLeft: theme.spacing(1.5)
        }
    },
    sortBy: {
        textTransform: 'capitalize',
        minWidth: 32
    },
    selectAll: {
        height: 30,
        minWidth: 96,
        marginRight: theme.spacing(1.5)
    },
    icon:{
        marginRight: theme.spacing(2)
    }
}))

export default function GalleryTools(){
    const classes = styles();
    const matches = useMediaQuery('(min-width:600px)');
    const [anchorEl, setAnchorEl] = useState(null)

 
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <>
            {matches ?
                <>
                    <SearchBar/>
                    <Button size='small' className={classes.selectAll} variant='outlined'>
                        Select All
                    </Button>
                
                    <Box marginRight='12px'>
                        <IconButton onClick={handleMenuClick} className={classes.iconButton} aria-label='actions'>
                            <Tooltip title="Actions" aria-label="Actions">
                                <MoreVertIcon />
                            </Tooltip>
                        </IconButton> 
                    </Box>
                </> : 

                <>
    
                    <IconButton className={classes.iconButton}                      aria-label='select-all'>
                        <Tooltip title="Select All" aria-label="select-all">
                            <SelectAllIcon />
                        </Tooltip>
                    </IconButton> 
                
                    
                    <IconButton onClick={handleMenuClick} className={classes.iconButton} aria-label='actions'>
                        <Tooltip title="Actions" aria-label="Actions">
                            <MoreVertIcon />
                        </Tooltip>
                    </IconButton> 
                </>

                
            }
   
            <Menu 
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem id='Download'>
                    <GetAppIcon fontSize='small' className={classes.icon}/>Download
                </MenuItem>
                <MenuItem id='Delete' >
                    <DeleteForeverIcon fontSize='small' className={classes.icon}/>Delete
                </MenuItem>
            </Menu>     
            
        </>
    )
}


