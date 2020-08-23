import React, { useState, useLayoutEffect } from 'react'
import {useDispatch } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import {toggleLinkDialog, toggleCreateClicked, setSnackbar, toggleFirstRender, toggleLoading, setProgress} from '../../../../Actions/Interface/allInterfaceActions'
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
    const linkDialog = useSelector(state => state.interface.linkDialog);
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
  
    //erase errors and values on close/open
    useLayoutEffect(()=> {
        if(errors.link){
            setErrors({link: ''});
        }
        if(values.link){
            setValues({link: ''});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[linkDialog])

    //trigger on link submit by user
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {link} = values; 
        setErrors({        
            link: '',
        }); 
        //uses 3rd party to check if link is image; unsplash exception
        if(!isImageUrl(link) && !link.match(/(unsplash\.com\/photo)/)) {
            return setErrors(errors => ({...errors, link:'Not a valid image url.'}))
        }
        //convert link to blob so it can be compressed and uploaded to server
        fetch(link)
            .then(function(response) {
                return response.blob()
            })
            .then(function(blob) {
                handleUpload(blob)
                //close link dialog
            });
    }

    const handleUpload = async (image) => {
        if(image.size > 5 * 1024 * 1024) {
            return setErrors({link: 'File size exceeds 5mb limit.'});
        }
        //close link dialog
        dispatch(toggleLinkDialog(false));
        //triggers canvas loader 
        dispatch(toggleLoading(true));
        //compress image (small = stripe size, medium = background size)
        const small = await imageCompression(image, {maxSizeMB: .05, maxWidthOrHeight: 400});
        const medium = await imageCompression(image, {maxSizeMB: .5});
        const storage = firebase.storage();

        //3. called after both small and medium files upload
        const getDownloadUrls = async () => {
            let smallUrl = await storage
            .ref(`images/uploads/${uid}`)
            .child('small')
            .getDownloadURL()

            let mediumUrl = await storage
            .ref(`images/uploads/${uid}`)
            .child('medium')
            .getDownloadURL()
    
            //reset canvas interface
            dispatch(toggleCreateClicked(false))
            dispatch(toggleFirstRender(true))
            //set new canvas image
            dispatch(setImage({small: smallUrl, medium: mediumUrl}));
            //close loader 
            dispatch(setProgress(0))
            dispatch(toggleLoading(false))
            
        }

        //2. called after small file uploaded to server, await cannot be used
        const uploadMedium = () => {
            storage.ref(`images/uploads/${uid}/medium`).put(medium)
                .on("state_changed",
                    //track progress with loader
                    snapshot => {
                        const progress = Math.round(
                            ((snapshot.bytesTransferred / snapshot.totalBytes) * 50) + 50 
                        );
                        dispatch(setProgress(progress));
                    },
                    //on error
                    () => {
                        dispatch(setProgress(0))
                        dispatch(toggleLoading(false))
                        dispatch(setSnackbar({success: false, message: 'Image failed to upload.'}))
                    }, 
                    //async get reference urls form server
                    getDownloadUrls
                );   
        }

        //1. upload small file to server, await cannot be used
        storage.ref(`images/uploads/${uid}/small`).put(small)
            .on("state_changed",
                //track progress with loader
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 50
                    );
                    dispatch(setProgress(progress));
                },
                //on error
                () => {
                    dispatch(setProgress(0))
                    dispatch(toggleLoading(false))
                    dispatch(setSnackbar({success: false, message: 'Image failed to upload.'}))
                },
                //async upload medium file to server
                uploadMedium
            );   
    }

    return (
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClose}
        >
            <Grow in={linkDialog}>
                <Box className={classes.container}>
                    <Box className={classes.dialog}>
                        <Avatar className={classes.avatar}>
                            <Icon className={classes.icon}>
                                <LinkIcon/>
                            </Icon>
                        </Avatar>
                        <Typography className={classes.title} variant='h6'>Provide Image Url</Typography>
                
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                required
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
                </Box>     
            </Grow>   
        </ClickAwayListener>
    );
         
}