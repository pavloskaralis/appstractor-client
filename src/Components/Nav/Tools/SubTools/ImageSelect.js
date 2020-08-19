import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import setImage from '../../../../Actions/Canvas/setImage'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import {toggleLoading, setProgress, toggleCreateClicked, toggleFirstRender, toggleLinkDialog, toggleSearchDialog, setSnackbar} from '../../../../Actions/Interface/allInterfaceActions'

const styles = makeStyles(theme => ({
    group:{
        marginLeft: theme.spacing(1.5),  
        '& .MuiButtonGroup-groupedTextHorizontal:not(:last-child)':{
            border: 'none'
        }
    },
}))


export default function ImageSelect(){
    const classes = styles(); 
    //used to proxy click hidden input
    const inputRef = useRef();
    //used to allocate 1 upload file per user
    const uid = useSelector(state => state.firebase.auth.uid);
    const dispatch = useDispatch(); 
    const firebase = useFirebase();

    const uploadClick = () => {
        inputRef.current.click(); 
    }

    const handleUpload = (event) => {
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
                    dispatch(setSnackbar({success: false, message: 'File size exceeds 5mb limit.'}))
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

    const handleLink = () => {
        dispatch(toggleLinkDialog(true))
    }

    const handleSearch = () => {
        dispatch(toggleSearchDialog(true))
    }


    return (
        <>    
            <ButtonGroup className={classes.group} variant='text' size='small'      aria-label='text primary button group'>
                <Button onClick={uploadClick}>Upload</Button>
                <Button onClick={handleLink}>Link</Button>
                <Button onClick={handleSearch}>Search</Button>    
            </ButtonGroup>
            <input onChange={handleUpload} accept="image/*" ref={inputRef} style={{display: 'none'}} id='upload' type="file" />
        </>
    )
}


