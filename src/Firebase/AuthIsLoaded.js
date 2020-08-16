import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles(theme=>({
    splash: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: '100%',
    }
}))
export default function AuthIsLoaded({ children }) {
    const classes = styles(); 
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div className={classes.splash}/>;
    return children
}