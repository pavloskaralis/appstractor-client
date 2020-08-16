import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Error'

const styles = makeStyles(theme => ({
    error: {
        fontSize: theme.typography.pxToRem(12),
        margin: theme.spacing(0,.5,-.25, 0)
    }
}))

export default function Error({children}){
    const classes = styles();
    return  <span><ErrorIcon className={classes.error}/>{children}</span>
}
