import React, { useEffect, useState } from 'react'
import Canvas from '../Canvas/Canvas'
import domtoimage from 'dom-to-image'
import {useSelector, useDispatch, } from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import {useFirebase, useFirestore} from 'react-redux-firebase'
import {toggleCapture, setProgress, setSnackbar, toggleLoading, toggleRendering} from '../../Actions/Interface/allInterfaceActions';

export default function Capture () {
    const dispatch = useDispatch(); 
    const history = useHistory();
    const {pathname} = useLocation(); 
    const {image, quantity, background, pattern, shadow, randomValues, swapPattern}  = useSelector(state => state.canvas);
    const capture = useSelector(state => state.interface.capture);
    const uid = useSelector(state => state.firebase.auth.uid);
    const firebase = useFirebase();
    const firestore = useFirestore();
    const [blob,setBlob] = useState(null);

    useEffect(()=> {
        dispatch(toggleRendering(true));
        dispatch(setSnackbar({success: true, capture: true, message: 'Converting to image (~15 seconds).'}))
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
                            title: capture,
                            state: {image, quantity, background, pattern, shadow, randomValues, swapPattern}
                        })
                    dispatch(toggleCapture(false));
                    setTimeout(()=>{
                        dispatch(toggleLoading(false));
                        dispatch(setProgress(0));
                        if(pathname.match('edit')) {
                            history.push('/gallery')
                            dispatch(setSnackbar({success: true, message: 'Edit saved to gallery.'}));
                        }else{
                            dispatch(setSnackbar({success: true, message: 'Image saved to gallery.'}));
                        }
                    },0)
                });
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blob])

    return(
        <div id='capture' style={{
            zIndex: 1,
            width: '1800px',
            height: '1200px',
            position: 'absolute',
            top: 0
        }}>
            <Canvas/>
        </div>
    )
}

