import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import {useDispatch, useSelector} from 'react-redux'
import {useFirestore, useFirebase} from 'react-redux-firebase'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import {updateSelected, toggleDeleteDialog }from '../../../../Actions/Interface/allInterfaceActions';

const styles = makeStyles(theme => ({
    dialog: {
        '& .MuiPaper-root':{
            padding: theme.spacing(2)
        },
    },
    avatar:{
        margin: '0 auto',
        background: theme.palette.secondary.main,
    },
    icon: {
        margin: '0 auto',
        color: theme.palette.text.primary,
    },
    title: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2),
    },


}))
export default function DeleteDialog() {
    const classes = styles(); 
    const dispatch = useDispatch();
    const {deleteDialog, selected} = useSelector(state => state.interface);
    const firestore = useFirestore();
    const firebase = useFirebase();
    const uid = useSelector(state => state.firebase.auth.uid);

    const handleClose = () => {
        dispatch(toggleDeleteDialog(false));
        setTimeout(()=> {
            dispatch(updateSelected([]));
        },150)
    };

    const deleteSelected = () => {    

        const storage = firebase.storage();
        const path = storage.ref(`images/appstractions/${uid}`);
        const batch = firestore.batch();
        for(let i = 0; i < selected.length; i ++) {
            const ref = firestore.collection('users').doc(uid)
                .collection('appstractions').doc(selected[i].doc)
            batch.delete(ref);
        }
        batch.commit();

        //delete storage after doc
        for(let i = 0; i < selected.length; i++){
            path.child(selected[i].doc).delete();
        }

        handleClose(); 
        //prevent undefined text 
        setTimeout(()=>{
            dispatch(updateSelected([]));
        },150)
    }
  
    return (
        <Dialog
          open={deleteDialog}
          onClose={handleClose}
          aria-labelledby="delete-title"
          className={classes.dialog}
          onClick={(e)=>e.stopPropagation()}
        >   
            <Avatar className={classes.avatar}>
                <Icon className={classes.icon}>
                    <DeleteForeverIcon/>
                </Icon>
            </Avatar>
            <Typography id="delete-title" className={classes.title} variant='h6'>
                {selected.length > 1 || !selected.length ? `Delete ${selected.length} images?` : `Delete "${selected[0].title}"?`}
            </Typography>

            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button variant='contained' onClick={handleClose} color="default">
                    Cancel
                </Button>
                <div style={{width:'12px'}}/>
                <Button variant='contained' onClick={deleteSelected} color='secondary' >
                    Delete
                </Button>
            </div>
        </Dialog>
    );
  }