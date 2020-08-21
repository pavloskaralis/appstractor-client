import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Canvas from '../Canvas/Canvas'
import domtoimage from 'dom-to-image'
import {useSelector, useDispatch} from 'react-redux'
import {useFirebase, useFirestore} from 'react-redux-firebase'
import {toggleCapture, setProgress, setSnackbar, toggleLoading} from '../../Actions/Interface/allInterfaceActions';

export default function Capture () {
    const dispatch = useDispatch(); 
    const {quantity,pattern,background,shadow,image,randomValues,swapPattern} = useSelector(state => state.canvas);
    //capture holds string of image title
    const {capture, rendering, loading}= useSelector(state => state.interface);
    const uid = useSelector(state => state.firebase.auth.uid);
    const firebase = useFirebase();
    const firestore = useFirestore();
    const [blob,setBlob] = useState(null);

    useEffect(()=> {
        //allow capture canvas to render
        dispatch(toggleLoading(true));
        setTimeout(()=> {
            console.log('capturing')
            domtoimage.toBlob(document.getElementById('capture'))
            .then(function (blob) {
                setBlob(blob)
            });
        },0)
    },[rendering])

    useEffect(()=> {
        if(!blob) return;

        const storage = firebase.storage();
        const uploadTask = storage.ref(`images/appstractions/${uid}/${capture}`).put(blob);
        uploadTask.on("state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                dispatch(setProgress(progress));
            },
            () => {
                dispatch(setProgress(0));
                dispatch(toggleLoading(false));
                dispatch(toggleCapture(false));
                dispatch(setSnackbar({success: false, message: 'Image failed to save.'}))
            },
            () => {
                storage
                .ref(`images/appstractions/${uid}`)
                .child(capture)
                .getDownloadURL()
                .then(url => {
                    firestore.collection(`users/${uid}/appstractions`)
                        .doc(capture)
                        .set({
                            url: url, 
                            state: {quantity,pattern,background,shadow,image,randomValues,swapPattern}
                        })
                    
                    dispatch(toggleCapture(false));
                    dispatch(setProgress(0));
                    dispatch(toggleLoading(false));
                    setTimeout(()=>{
                        dispatch(setSnackbar({success: true, message: 'Image saved to gallery.'}));
                    },0)
                });
            }
        );
    },[blob])

    return(
        <Box id='capture' zIndex={1} width='3600px' height='2400px' position='absolute'>
            <Canvas/>
        </Box>
    )
}

