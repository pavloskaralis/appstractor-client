import React, { useEffect, useState } from 'react'
import Canvas from '../Canvas/Canvas'
import domtoimage from 'dom-to-image'
import {useSelector, useDispatch} from 'react-redux'
import {useFirebase, useFirestore} from 'react-redux-firebase'
import {toggleCapture, setProgress, setSnackbar, toggleLoading, toggleRendering} from '../../Actions/Interface/allInterfaceActions';

export default function Capture () {
    const dispatch = useDispatch(); 
    const capture = useSelector(state => state.interface.capture);
    const uid = useSelector(state => state.firebase.auth.uid);
    const firebase = useFirebase();
    const firestore = useFirestore();
    const [blob,setBlob] = useState(null);

    useEffect(()=> {
        dispatch(toggleRendering(true));
        dispatch(setSnackbar({success: true, capture: true, message: 'Converting to image (up to 20 seconds).'}))
        setTimeout(()=> {
            domtoimage.toBlob(document.getElementById('capture'),{cacheBust: true})
            .then(function (blob) {
                dispatch(setSnackbar({success: true, capture: true, message: 'Uploading image to server.'}))
                dispatch(toggleLoading(true));
                dispatch(toggleRendering(false));
                setBlob(blob);
            });
        },0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=> {
        if(!blob) return;

        const storage = firebase.storage();
        const uploadTask = storage.ref(`images/appstractions/${uid}/${capture}`).put(blob);
        uploadTask.on("state_changed",
            snapshot => {
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
                            title: capture
                        })
                    
                    dispatch(toggleCapture(false));
                    setTimeout(()=>{
                        dispatch(toggleLoading(false));
                        dispatch(setProgress(0));
                        dispatch(setSnackbar({success: true, message: 'Image saved to gallery.'}));
                    },0)
                });
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blob])

    return(
        <div id='capture' style={{
            zIndex: 1,
            width: '1500px',
            height: '1000px',
            position: 'absolute'
        }}>
            <Canvas/>
        </div>
    )
}

