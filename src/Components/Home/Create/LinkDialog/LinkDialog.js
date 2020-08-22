import React, { useState, useLayoutEffect } from 'react'
import {useDispatch } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import {toggleLinkDialog, toggleCreateClicked, toggleFirstRender, toggleLoading, setProgress, setSnackbar} from '../../../../Actions/Interface/allInterfaceActions'
import Icon from '@material-ui/core/Icon'
import LinkIcon from '@material-ui/icons/Link'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Error from '../../../FormPage/Error/Error'
import isImageUrl from 'is-image-url'
import setImage from '../../../../Actions/Canvas/setImage';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip'
import {useSelector} from 'react-redux'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import imageCompression from 'browser-image-compression'
import {useFirebase} from 'react-redux-firebase'

const styles = makeStyles(theme => ({
    container: {
        position:'absolute', 
        padding:'12px', 
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
        }
    },
    textField: {
        '@media (max-width: 779px) and (min-width: 600px)':{
            marginBottom: theme.spacing(.5)
        },
        '@media (max-width: 399px)':{
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
        }
    }
}))

export default function LinkDialog(){
    const classes = styles(); 
    const dispatch = useDispatch();
    const {linkDialog,loading} = useSelector(state => state.interface);
    const uid = useSelector(state => state.firebase.auth.uid);
    const firebase = useFirebase();

    const [values, setValues] = useState({
        link: '',
    })
    const [errors, setErrors] = useState({
        link: '',
    })


    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };

    const handleClose = () => {
        if(!linkDialog) return;
        dispatch(toggleLinkDialog(false))  
    };
  
    //erase errors and values on
    useLayoutEffect(()=> {
        if(errors.link){
            setErrors({link: ''});
        }
        if(values.link){
            setValues({link: ''});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[linkDialog])

    const handleUpload = async (blob) => {
        if(blob.size > 5 * 1024 * 1024) {
            return setErrors({link: 'File size exceeds 5mb limit.'});
        }

        dispatch(toggleLoading(true));
        const small = await imageCompression(blob, {maxSizeMB: .05, maxWidthOrHeight: 400});
        const medium = await imageCompression(blob, {maxSizeMB: .5});
        const storage = firebase.storage();

        const getDownloadUrls = async () => {
            let smallUrl = await storage
            .ref(`images/uploads/${uid}`)
            .child('small')
            .getDownloadURL()

            let mediumUrl = await storage
            .ref(`images/uploads/${uid}`)
            .child('medium')
            .getDownloadURL()

            dispatch(toggleCreateClicked(false))
            dispatch(toggleFirstRender(true))
            dispatch(setImage({small: smallUrl, medium: mediumUrl}));
            dispatch(toggleLinkDialog(false));
            
            setTimeout(()=>{
                dispatch(setProgress(0))
                dispatch(toggleLoading(false))
            }, 200)
            
        }

        const uploadMedium = async () => {
            storage.ref(`images/uploads/${uid}/medium`).put(medium)
                .on("state_changed",
                    snapshot => {
                        // progress function ...
                        const progress = Math.round(
                            ((snapshot.bytesTransferred / snapshot.totalBytes) * 50) + 50 
                        );
                        dispatch(setProgress(progress));
                    },
                    () => {
                        dispatch(setProgress(0))
                        dispatch(toggleLoading(false))
                        setErrors({link: 'File size exceeds 5mb limit.'});
                    }, 
                    getDownloadUrls
                );   
        }

        storage.ref(`images/uploads/${uid}/small`).put(small)
            .on("state_changed",
                snapshot => {
                    // progress function ...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 50
                    );
                    dispatch(setProgress(progress));
                },
                () => {
                    dispatch(setProgress(0))
                    dispatch(toggleLoading(false))
                    setErrors({link: 'File size exceeds 5mb limit.'});
                },
                uploadMedium
            );    
    
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {link} = values; 
        setErrors({        
            link: '',
        }); 
        if(!isImageUrl(link) && !link.match(/(unsplash\.com\/photo)/)) {
            return setErrors(errors => ({...errors, link:'Not a valid image url.'}))
        }

        fetch(link)
            .then(function(response) {
                return response.blob()
            })
            .then(function(blob) {

                handleUpload(blob)
            });
        
     
    }

    return (
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClose}
        >
            <Grow in={linkDialog}>
                <Box className={classes.container}>
                    {!loading &&
                        <>
                            <Box className={classes.dialog}>
                                <Avatar className={classes.avatar}>
                                    <Icon className={classes.icon}>
                                        <LinkIcon/>
                                    </Icon>
                                </Avatar>
                                <Typography className={classes.title} variant='h6'>Provide Image Url</Typography>
                        
                                <form onSubmit={handleSubmit} className={classes.form}>
                                    <TextField
                                        error={Boolean(errors.link)}
                                        helperText={errors.link && <Error>{errors.link}</Error>}
                                        color='secondary'
                                        id='link'
                                        label='Image URL'
                                        fullWidth
                                        value={values.link}
                                        onChange={handleChange}
                                        variant='filled'
                                        className={classes.textField}
                                    />
                                    <Button type='submit' fullWidth color='secondary' variant='contained'>Link Url</Button>
                                </form>            
                            </Box>
                            <IconButton onClick={handleClose} size='small' className={classes.iconButton} aria-label='close'>
                                <Tooltip title="Close" aria-label="close">
                                    <CloseIcon fontSize='small'/>
                                </Tooltip>
                            </IconButton>
                        </>
                    }  
                </Box>     
            </Grow>   
        </ClickAwayListener>
    );
         
  
}