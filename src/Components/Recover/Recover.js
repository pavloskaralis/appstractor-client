import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email'
import FormPage from '../FormPage/FormPage'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {LOGIN} from '../../Routes/routes'

const styles = makeStyles(theme => ({
    form: {
        margin:'0 auto',
        width: 296
    },
    link:{
        margin: '0 auto',
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginTop: 16,
    },
}))

export default function Recover(){
    const classes = styles();
    const [values, setValues] = useState({
        email: '',
    })

    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };
    


    return (
        <FormPage icon={<EmailIcon/>} title='Reset Your Password'>
            <form className={classes.form}>
                <TextField
                    color='secondary'
                    id='email'
                    label='Email Address'
                    required
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    variant='filled'
                />
                <Box height='16px'/>
                <Button type='submit' fullWidth color='secondary' variant='contained'>
                    Reset Password
                </Button>
            </form>
            <Link component={RouterLink} to={LOGIN} className={classes.link}>
               Return to Login
            </Link>
        </FormPage> 
    )
}