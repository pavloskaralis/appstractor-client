import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import setImage from '../../../../Actions/Canvas/setImage'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import {toggleLoading, setProgress, toggleCreateClicked, toggleFirstRender, toggleLinkDialog, toggleSearchDialog, setSnackbar} from '../../../../Actions/Interface/allInterfaceActions'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import LinkIcon from '@material-ui/icons/Link'
import SearchIcon from '@material-ui/icons/Search'
import MenuItem from '@material-ui/core/MenuItem'

const styles = makeStyles(theme => ({
    group:{
        marginLeft: theme.spacing(1.5),  
        '& .MuiButtonGroup-groupedTextHorizontal:not(:last-child)':{
            border: 'none'
        }
    },
    icon:{
        marginRight: theme.spacing(2)
    }
}))


export default function ImageSelect({handleClose, type}){
    const classes = styles(); 
    const matches = useMediaQuery('(min-width:600px)');
    //used to proxy click hidden input
    const inputRef = useRef();
    //used to allocate 1 upload file per user
    const uid = useSelector(state => state.firebase.auth.uid);
    const dispatch = useDispatch(); 
    const firebase = useFirebase();

    const uploadClick = () => {
        if(handleClose)handleClose();
        inputRef.current.click(); 
    }

    const handleUpload = (event) => {
        if(handleClose)handleClose();

        dispatch(toggleLoading(true));
        const target = event.target;
        const image = target.files[0];
        const storage = firebase.storage();
        const uploadTask = storage.ref(`images/uploads/${uid}`).put(image);
            uploadTask.on("state_changed",
                snapshot => {
                    // progress function ...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    dispatch(setProgress(progress));
                },
                () => {
                    dispatch(setProgress(0))
                    dispatch(toggleLoading(false))
                    dispatch(setSnackbar({success: false, message: 'File size exceeds 20mb limit.'}))
                },
            () => {
                storage
                .ref("images/uploads")
                .child(uid)
                .getDownloadURL()
                .then(url => {
                    dispatch(toggleCreateClicked(false))
                    dispatch(toggleFirstRender(true))
                    dispatch(setImage(url))
                    setTimeout(()=>{
                        dispatch(setProgress(0))
                        dispatch(toggleLoading(false))
                    }, 200)
                });
            }
        );    
    }

    const linkClick = () => {
        if(handleClose)handleClose();
        setTimeout(()=>dispatch(toggleLinkDialog(true)),100)
    }

    const searchClick = () => {
        if(handleClose)handleClose();
        setTimeout(()=> dispatch(toggleSearchDialog(true)), 150)
    }



    return (
        <>
            {(matches || type === 'canvas') ?
                <>    
                    <ButtonGroup className={classes.group} variant='text' size='small'      aria-label='text primary button group'>
                        <Button onClick={uploadClick}>Upload</Button>
                        <Button onClick={linkClick}>Link</Button>
                        <Button onClick={searchClick}>Search</Button>    
                    </ButtonGroup>
                    <input onChange={handleUpload} accept="image/*" ref={inputRef} style={{display: 'none'}} id='upload' type="file" />
                </> :
                <>
                    <MenuItem onClick={uploadClick}><CloudUploadIcon fontSize='small' className={classes.icon}/>Upload</MenuItem>
                    <MenuItem onClick={linkClick}><LinkIcon fontSize='small' className={classes.icon}/>Link</MenuItem>
                    <MenuItem onClick={searchClick}><SearchIcon fontSize='small' className={classes.icon}/>Search</MenuItem>
                    <input onChange={handleUpload} accept="image/*" ref={inputRef} style={{display: 'none'}} id='upload' type="file" />
                </>
            }
        </>
    )
}


