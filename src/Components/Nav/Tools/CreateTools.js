import React, { useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import ImageIcon from '@material-ui/icons/Image'
import SaveIcon from '@material-ui/icons/Save'
import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import LinkIcon from '@material-ui/icons/Link'
import SearchIcon from '@material-ui/icons/Search'

const styles = makeStyles(theme => ({
    group:{
        marginLeft: theme.spacing(1.5),  
    },
    saveButton: {
        margin: theme.spacing(0, 1.5),
    },
    iconButton: {
         color: theme.palette.text.primary,
    }, 
    icon:{
        marginRight: theme.spacing(1)
    }
}))

export default function CreateTools(){
    const classes = styles();
    const matches = useMediaQuery('(min-width:600px)');

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <> 
            {matches ? 
                <>
                    <ButtonGroup className={classes.group} variant='text' size='small' aria-label='text primary button group'>
                        <Button>Upload</Button>
                        <Button>Link</Button>
                        <Button>Search</Button>      
                     </ButtonGroup>
         
                    <Button className={classes.saveButton} size='small' startIcon={<SaveIcon/>} variant='outlined'>Save</Button>
                </> :
                <>
                    <IconButton className={classes.iconButton} aria-label='image-select' onClick={handleClick}>
                        <Tooltip title="Image Select" aria-label="image-select">
                            <ImageIcon />
                        </Tooltip>
                    </IconButton> 
                    <IconButton className={classes.iconButton} aria-label='save'>
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
                        <MenuItem onClick={handleClose}><CloudUploadIcon fontSize='small' className={classes.icon}/>Upload</MenuItem>
                        <MenuItem onClick={handleClose}><LinkIcon fontSize='small' className={classes.icon}/>Link</MenuItem>
                        <MenuItem onClick={handleClose}><SearchIcon fontSize='small' className={classes.icon}/>Search</MenuItem>
                    </Menu>
                </>
            }
            
   
        </>
    )
}


