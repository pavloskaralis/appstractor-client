import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import setSnackbar from '../../Actions/Interface/setSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

const styles = makeStyles((theme) => ({
    iconButton: {
        color: theme.palette.text.primary
    },
    icon: {
        marginRight: theme.spacing(1),
        
    },
    text: {
        fontSize: theme.typography.pxToRem(14),
        lineHeight: 1.75
    }
}));

  
export default function GlobalSnackbar(){
    const classes = styles();
    const snackbar = useSelector(state => state.interface.snackbar);
    const dispatch = useDispatch();
    

    const handleClose = () => {
        dispatch(setSnackbar(null));
    }

    const message = (
        <Box display='flex'> 
            <CheckCircleIcon className={classes.icon} size='small' color='secondary'/>
            <Typography className={classes.text}>{snackbar}</Typography>
        </Box>
    )

    return(
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(snackbar)}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbar && message}
            action={
                <IconButton size="small" aria-label="close" className={classes.iconButton} onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    
    )
}