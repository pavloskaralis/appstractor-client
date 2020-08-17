import React, {useEffect} from 'react'
import Create from '../Home/Create/Create'
import defaultImage from '../../Styles/defaultImage.jpeg'
import {useDispatch} from 'react-redux'
import setImage from '../../Actions/Canvas/setImage'

export default function Demo(){
    const dispatch = useDispatch();

    //set demo/landing image on load
    useEffect(()=> {
        dispatch(setImage(defaultImage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    return (
        <Create/>
    )
}