import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'

const styles = makeStyles(theme => ({
    backdrop: {
        zIndex: 1204,
        backgroundColor: 'rgba(66, 66, 66, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
    }
}))

export default function GlobalBackdrop(){
    const classes = styles(); 
    const capture = useSelector(state => state.interface.capture)

    return (
        <Fade in={Boolean(capture)}>
            <div className={classes.backdrop} />
        </Fade>
    )
}