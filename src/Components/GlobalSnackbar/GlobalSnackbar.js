import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import setSnackbar from '../../Actions/Interface/setSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = makeStyles((theme) => ({
    iconButton: {
        color: theme.palette.secondary.main
    }
}));

  
export default function GlobalSnackbar(){
    const classes = styles();
    const snackbar = useSelector(state => state.interface.snackbar);
    const dispatch = useDispatch();
    

    const handleClose = () => {
        dispatch(setSnackbar(null));
    }
    return(
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(snackbar)}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbar}
            action={
                <IconButton size="small" aria-label="close" className={classes.iconButton} onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    
    )
}