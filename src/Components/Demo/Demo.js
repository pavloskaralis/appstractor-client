import React, {useEffect, useState} from 'react'
import Create from '../Home/Create/Create'
import defaultImage from '../../Styles/defaultImage.jpeg'
import {useDispatch} from 'react-redux'
import setImage from '../../Actions/Canvas/setImage'
import setSnackbar from '../../Actions/Interface/setSnackbar'

export default function Demo(){
    const dispatch = useDispatch();
    const [isChrome] = useState(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));

    //set demo/landing image on load
    useEffect(()=> {
        if(!isChrome){
            dispatch(setSnackbar({success: false, message: 'Site requires chrome browser.'}))
        }
        dispatch(setImage({small: defaultImage, medium: defaultImage}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    return (
        <Create/>
    )
}