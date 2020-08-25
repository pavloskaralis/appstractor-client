import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TitleIcon from '@material-ui/icons/Title'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import loadPreset from '../../../../../Actions/Canvas/loadPreset'
import {updateSelected, setSnackbar, setPreset, toggleFirstRender, toggleCreateClicked} from '../../../../../Actions/Interface/allInterfaceActions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const styles = makeStyles(theme => ({
    icon:{
        marginRight: theme.spacing(2)
    },
}))



export default function Actions({handleClose,  title}) {
    const classes = styles(); 
    const history = useHistory(); 
    const dispatch = useDispatch(); 
 
    const editClick = () => {
        handleClose();
        
        history.push(`/edit/${title}`);
    }

    return(   
        <>
            <MenuItem onClick={editClick} id='Edit'>
                <EditIcon fontSize='small' className={classes.icon}/>Edit
            </MenuItem>
            <MenuItem id='Rename' >
                <TitleIcon fontSize='small' className={classes.icon}/>Rename
            </MenuItem>
            <MenuItem id='Delete' >
                <DeleteForeverIcon fontSize='small' className={classes.icon}/>Delete
            </MenuItem>
        </>
    )
}