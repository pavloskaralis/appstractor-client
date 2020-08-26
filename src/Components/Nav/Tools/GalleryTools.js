import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import {useDispatch, useSelector} from 'react-redux'
import {updateSelected, toggleDeleteDialog} from '../../../Actions/Interface/allInterfaceActions'
import {useFirestoreConnect} from 'react-redux-firebase'

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
    },
    disabled: {
        color: theme.palette.text.secondary
    }
}))

export default function GalleryTools(){
    const classes = styles();
    const matches = useMediaQuery('(min-width:600px)');
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null)
    const selected = useSelector(state => state.interface.selected);
    //load appstractions
    const uid = useSelector(state => state.firebase.auth.uid);
    useFirestoreConnect([ { collection: 'users', doc: uid, subcollections: [{ collection: 'appstractions' }], storeAs: 'appstractions' } ])
    const appstractions = useSelector( state => state.firestore.data.appstractions);
 
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectAll = () => {
        handleClose();
        if(selected.length === Object.keys(appstractions).length) {
            dispatch(updateSelected([]));
        } else {
            dispatch(updateSelected(Object.entries(appstractions).map(([key,val])=>({doc: key, title: val.title }))));
        }
    }

    const deleteSelected = () => {
        if(!selected.length) return;
        handleClose();
        dispatch(toggleDeleteDialog(true));
    }

    const navDownload = () => {
        if(!selected.length) return;
        handleClose();
        function download(img) {
        
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                const blob = xhr.response;
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.download = `appstractorart_${img.title}`;
                a.href = blobUrl;
                a.click();          
            };
            xhr.open('GET', img.url);
            xhr.send()   
        }
        for (let i = 0; i < selected.length; i++) {
            const img = appstractions[selected[i]];
            download(img);
        }
        
    }

    
    return (
        <>
            {matches ?
                <>
                    <SearchBar/>
                    <Button size='small' onClick={selectAll} className={classes.selectAll} variant='outlined'>
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
    
                    <IconButton  onClick={selectAll} className={classes.iconButton}                      aria-label='select-all'>
                        <Tooltip title="Select All" aria-label="select-all">
                            <SelectAllIcon />
                        </Tooltip>
                    </IconButton> 
                
                    
                    <IconButton onClick={handleMenuClick} className={classes.iconButton} aria-label='actions'>
                        <Tooltip title="Actions" aria-label="actions">
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
                <MenuItem onClick={navDownload} id='Download' className={!selected.length ? classes.disabled : ''}>
                    <GetAppIcon fontSize='small' className={classes.icon}/>Download
                </MenuItem>
                <MenuItem onClick={deleteSelected} id='Delete' className={!selected.length ? classes.disabled : ''}>
                    <DeleteForeverIcon fontSize='small' className={classes.icon}/>Delete
                </MenuItem>
            </Menu>     
            
        </>
    )
}


