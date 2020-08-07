import React, { useContext, useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import ImageIcon from '@material-ui/icons/Image'
import SaveIcon from '@material-ui/icons/Save'
import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles} from '@material-ui/core/styles'
import ViewportContext from '../../../Contexts/ViewportContext'
import Tooltip from '@material-ui/core/Tooltip'

const styles = makeStyles(theme => ({
    saveButton: {
        marginLeft: 12
    },
    iconButton: {
         color: theme.palette.text.primary,
    }, 
}))

export default function HomeButtons(){
    const classes = styles();
    const viewportWidth = useContext(ViewportContext);

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <> 
            {viewportWidth >= 512 ? 
                <>
                    <ButtonGroup variant='text' size='small' aria-label='text primary button group'>
                        <Button>Upload</Button>
                        <Button>Link</Button>
                        <Button>Search</Button>      
                     </ButtonGroup>
         
                    <Button className={classes.saveButton} size='small' variant='outlined'>Save</Button>
                </> :
                <>
                    <IconButton className={classes.iconButton} aria-label='select' onClick={handleClick}>
                        <Tooltip title="Select" aria-label="select">
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
                        <MenuItem onClick={handleClose}>Upload</MenuItem>
                        <MenuItem onClick={handleClose}>Link</MenuItem>
                        <MenuItem onClick={handleClose}>Search</MenuItem>
                    </Menu>
                </>
            }
            
   
        </>
    )
}


