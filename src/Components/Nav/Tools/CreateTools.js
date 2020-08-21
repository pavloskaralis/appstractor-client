import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import ImageIcon from '@material-ui/icons/Image'
import SaveIcon from '@material-ui/icons/Save'
import {makeStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import toggleSaveDialog from '../../../Actions/Interface/toggleSaveDialog'

import {useSelector, useDispatch} from 'react-redux'
import ImageSelect from './SubTools/ImageSelect'

const styles = makeStyles(theme => ({

    saveButton: {
        margin: theme.spacing(0, 1.5),
    },
    iconButton: {
         color: theme.palette.text.primary,
    }, 

}))

export default function CreateTools(){
    const classes = styles();
    const matches = useMediaQuery('(min-width:600px)');
    const firstRender = useSelector(state => state.interface.firstRender);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const saveClick = () => {
        dispatch(toggleSaveDialog(true));
    }

    return (
        <> 
            {matches ? 
                <>
                    <ImageSelect/>
                    <Button disabled={firstRender} onClick={saveClick} className={classes.saveButton} size='small' startIcon={<SaveIcon/>} variant='outlined'>Save</Button>
                </> :
                <>
                    <IconButton className={classes.iconButton} aria-label='image-select' onClick={handleClick}>
                        <Tooltip title="Image Select" aria-label="image-select">
                            <ImageIcon />
                        </Tooltip>
                    </IconButton> 
                    <IconButton disabled={firstRender} onClick={saveClick} className={classes.iconButton} aria-label='save'>
                        <Tooltip title="Save" aria-label="save">
                            <SaveIcon />
                        </Tooltip>
                    </IconButton>  
                    <Menu 
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <ImageSelect handleClose={handleClose}/>
                    </Menu>
                </>
            }
            
   
        </>
    )
}


