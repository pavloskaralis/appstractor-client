import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TitleIcon from '@material-ui/icons/Title'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {toggleRenameDialog, updateSelected, toggleDeleteDialog} from '../../../../../Actions/Interface/allInterfaceActions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const styles = makeStyles(theme => ({
    icon:{
        marginRight: theme.spacing(2)
    },
}))



export default function Actions({handleClose, doc, title}) {
    const classes = styles(); 
    const history = useHistory(); 
    const dispatch = useDispatch(); 
 
    const editClick = () => {
        handleClose();
        setTimeout(()=> history.push(`/edit/${title}`));
    }

    const renameClick  = () => {
        handleClose();
        dispatch(updateSelected([{doc,title}]));
        dispatch(toggleRenameDialog(true));
    }

    const deleteClick = () => {
        handleClose();
        dispatch(updateSelected([{doc,title}]));
        dispatch(toggleDeleteDialog(true));
    }

    return(   
        <>
            <MenuItem onClick={editClick} id='Edit'>
                <EditIcon fontSize='small' className={classes.icon}/>Edit
            </MenuItem>
            <MenuItem onClick={renameClick} id='Rename' >
                <TitleIcon fontSize='small' className={classes.icon}/>Rename
            </MenuItem>
            <MenuItem id='Delete' onClick={deleteClick}>
                <DeleteForeverIcon fontSize='small' className={classes.icon}/>Delete
            </MenuItem>
        </>
    )
}