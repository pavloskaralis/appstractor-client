import React, { useState, useLayoutEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Error from '../../../FormPage/Error/Error'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {useSelector,useDispatch} from 'react-redux'
import Fade from '@material-ui/core/Fade'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {useFirestoreConnect} from 'react-redux-firebase'
import {toggleCapture, toggleSaveDialog} from '../../../../Actions/Interface/allInterfaceActions'

const styles = makeStyles(theme => ({
    container: {
        position:'absolute', 
        padding: theme.spacing(2), 
        zIndex:1, 
        height:'100%', 
        width:'100%', 
        top:'0',
        backgroundColor: theme.palette.background.darkDefault
    },
    title: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2),
        '@media (max-width: 779px) and (min-width: 600px)':{
            marginBottom: 0
        },
        '@media (max-width: 399px)':{
            marginBottom: 0
        },
        '@media (max-height: 496px)':{
            marginBottom: 0
        },
        '@media (max-height: 604px) and (max-width: 599px)':{
            marginBottom: 0
        }
    },
    textField: {
        '@media (max-width: 779px) and (min-width: 600px)':{
            marginBottom: theme.spacing(.5)
        },
        '@media (max-width: 399px)':{
            marginBottom: theme.spacing(.5)
        },
        '@media (max-height: 496px)':{
            marginBottom: theme.spacing(.5)
        },
        '@media (max-height: 604px) and (max-width: 599px)':{
            marginBottom: theme.spacing(.5)
        }
    },
    avatar:{
        margin: '0 auto',
        background: theme.palette.secondary.main,
    },
    icon: {
        margin: '0 auto',
        color: theme.palette.text.primary,
    },
    form: {
        '& .MuiFormHelperText-root':{
            backgroundColor: theme.palette.background.darkDefault,
        },
    },
    content: {
        maxWidth: 344
    },
    dialog: {
        display:'flex',
        flexDirection:'column', 
        justifyContent:'center',
        margin: '0 auto',
        height: '100%',
        maxWidth: 296
    },
    iconButton: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: 12,
        left: 12,
        '@media (max-width: 779px) and (min-width: 600px)':{
            top: 4,
            left: 4,        
        },
        '@media (max-width: 399px)':{
            top: 4,
            left: 4,
        },
        '@media (max-height: 496px)':{
            top: 4,
            left: 4,
        },
        '@media (max-height: 604px) and (max-width: 599px)':{
            top: 4,
            left: 4,        
        }
    }
}))

export default function SaveDialog(){
    const classes = styles(); 
    const dispatch = useDispatch();
    const saveDialog = useSelector(state => state.interface.saveDialog);
    const uid = useSelector(state => state.firebase.auth.uid);
    useFirestoreConnect([ { collection: 'users', doc: uid, subcollections: [{ collection: 'appstractions' }], storeAs: 'appstractions' } ])
    const appstractions = useSelector( state => state.firestore.data.appstractions);
    
    const [values, setValues] = useState({
        title: '',
    })

    const [errors, setErrors] = useState({
        title: '',
    })

    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };

    const handleClose = () => {
        if(!saveDialog) return;
        dispatch(toggleSaveDialog(false))  
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
    },[saveDialog])

    const handleSubmit = async (event) =>{
        event.preventDefault();
         
        setTimeout(()=> {
            const {title} = values; 
            setErrors({        
                title: '',
            }); 
            if(!title.match(/^\w+$/)){
                return setErrors(errors => ({...errors, title:'Title must be alphanumeric.'}))
            }
            if(appstractions && Object.values(appstractions).some(obj => obj.title === title)){
                return setErrors(errors => ({...errors, title:'Title is in use by another image.'}))
            }
            //trigger capture and pass title 
            dispatch(toggleSaveDialog(false));  
            setTimeout(()=>{
                dispatch(toggleCapture(title));
            },0)
        },150)  

    }

    return (
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClose}
        >
            <Fade in={saveDialog}>
                <div className={classes.container}>
                    <div className={classes.dialog}>
                        <Avatar className={classes.avatar}>
                            <Icon className={classes.icon}>
                                <SaveIcon/>
                            </Icon>
                        </Avatar>
                        <Typography className={classes.title} variant='h6'>Provide Image Title</Typography>
                
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
                            <Button type='submit' fullWidth color='secondary' variant='contained'>Save Image</Button>
                        </form>            
                    </div>
                    <IconButton onClick={handleClose} size='small' className={classes.iconButton} aria-label='close'>
                        <CloseIcon fontSize='small'/>
                    </IconButton>  
                </div>     
            </Fade>   
        </ClickAwayListener>
    );
         
  
}