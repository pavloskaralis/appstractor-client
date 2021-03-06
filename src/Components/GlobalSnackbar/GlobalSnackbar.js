import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import setSnackbar from '../../Actions/Interface/setSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule'

const styles = makeStyles((theme) => ({
    iconButton: {
        color: theme.palette.text.primary
    },
    icon: {
        marginRight: theme.spacing(1),
        
    },
    text: {
        fontSize: theme.typography.pxToRem(13),
        lineHeight: 2,
        [theme.breakpoints.up('sm')]:{
            fontSize: theme.typography.pxToRem(14),
            lineHeight: 1.75,
        }
    },
    snackbar: {
        margin: '0 auto',
        maxWidth: 300,
        minWidth: 300,
        [theme.breakpoints.up('sm')]:{
            minWidth: 320,
            maxWidth: 320,

        }
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
        <div style={{display: 'flex'}}> 
            {snackbar && snackbar.success ? 
                snackbar.capture ?  <ScheduleIcon className={classes.icon} size='small' color='secondary'/>  : <CheckCircleIcon className={classes.icon} size='small' color='secondary'/> :
                <ErrorIcon className={classes.icon} size='small' color='error'/>
            }
            <Typography className={classes.text}>{snackbar && snackbar.message}</Typography>
        </div>
    )

    return(
        <Snackbar
            className={classes.snackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(snackbar)}
            autoHideDuration={snackbar && (snackbar.capture || !snackbar.success) ? null : 6000}
            onClose={handleClose}
            message={snackbar && message}
            action={
                snackbar && snackbar.capture ?
                    <></>:
                    <IconButton size="small" aria-label="close" className={classes.iconButton} onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
            }
        />
    
    )
}