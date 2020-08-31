import React from 'react'
import FormPage from '../FormPage/FormPage'
import WarningIcon from '@material-ui/icons/Warning'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = makeStyles(theme => ({
    text: {
        color: theme.palette.text.primary,
        textAlign: 'center',
        maxWidth: 296,
        margin: '0 auto',
        marginBottom: 16
    }
}))

export default function NotChrome() {
    const classes = styles();
    return (
        <FormPage title='Browser Incompatable' icon={<WarningIcon/>}>
            <Typography className={classes.text}>
                Appstractor requires a chrome browser to support full functionality.
            </Typography>
        </FormPage>
    )
}