import React, {useState, useLayoutEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux'
import {useFirestore, useFirestoreConnect} from 'react-redux-firebase'
import Icon from '@material-ui/core/Icon'
import TitleIcon from '@material-ui/icons/Title'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import {updateSelected, setSnackbar, toggleRenameDialog }from '../../../../Actions/Interface/allInterfaceActions';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Error from '../../../FormPage/Error/Error'

const styles = makeStyles(theme => ({
    dialog: {
        '& .MuiPaper-root':{
            padding: theme.spacing(1.5)
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
    textField: {
        '@media (max-width: 779px) and (min-width: 600px)':{
            marginBottom: theme.spacing(.5)
        },
        '@media (max-width: 399px)':{
            marginBottom: theme.spacing(.5)
        }    
    },
    form: {
        maxWidth: 296,
        '& .MuiFormHelperText-root':{
            backgroundColor: theme.palette.background.paper,
        },
    },
}))
export default function DeleteDialog() {
    const classes = styles(); 
    const dispatch = useDispatch();
    const {renameDialog, selected} = useSelector(state => state.interface);
    const firestore = useFirestore(); 
    //load appstractions
    const uid = useSelector(state => state.firebase.auth.uid);
    useFirestoreConnect([ { collection: 'users', doc: uid, subcollections: [{ collection: 'appstractions' }], storeAs: 'appstractions' } ])
    const appstractions = useSelector( state => state.firestore.data.appstractions);

    const [values, setValues] = useState({
        title: '',
    })

    const [errors, setErrors] = useState({
        title: '',
    })

    const handleClose = () => {
        if(!renameDialog) return;
        dispatch(toggleRenameDialog(false));
        dispatch(updateSelected([]));
    };

    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };

     //erase errors and values on
     useLayoutEffect(()=> {
        if(errors.title){
            setErrors({title: ''});
        }
        if(values.title){
            setValues({title: ''});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[renameDialog])
    
    const handleSubmit = (event) => {
        event.preventDefault();
      
        const {title} = values; 
        setErrors({        
            title: '',
        }); 
        if(!title.match(/^\w+$/)){
            return setErrors(errors => ({...errors, title:'Title must use alphanumeric characters.'}))
        }
        if(appstractions && Object.values(appstractions).some(obj => obj.title === title)){
            return setErrors(errors => ({...errors, title:'Title is already assigned to another image.'}))
        }
        handleClose();

        firestore.collection('users').doc(uid).collection('appstractions').doc(selected[0].doc)
            .update({title: title})
          
          
    }

  
    return (
        <Dialog
          open={renameDialog}
          onClose={handleClose}
          aria-labelledby="delete-title"
          className={classes.dialog}
          onClick={(e)=>e.stopPropagation()}
        >   
            <Avatar className={classes.avatar}>
                <Icon className={classes.icon}>
                    <TitleIcon/>
                </Icon>
            </Avatar>
            <Typography id="delete-title" className={classes.title} variant='h6'>
                {selected[0] && `Rename "${selected[0].title}"`}
            </Typography>

            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    error={Boolean(errors.title)}
                    helperText={errors.title && <Error>{errors.title}</Error>}
                    color='secondary'
                    id='title'
                    label='Image Title'
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                    variant='filled'
                    className={classes.textField}
                    required
                    inputProps={{ maxLength: 12 }}
                />
                <Button type='submit' fullWidth color='secondary' variant='contained'>Rename Image</Button>
            </form>  

        </Dialog>
    );
  }