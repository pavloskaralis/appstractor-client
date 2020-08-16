import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email'
import FormPage from '../../FormPage/FormPage'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {LOGIN} from '../../../Routes/routes'
import { useFirebase } from 'react-redux-firebase'
import Error from '../../FormPage/Error/Error'
import Typography from '@material-ui/core/Typography'

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
    text: {
        color: theme.palette.text.primary,
        textAlign: 'center',
        maxWidth: 296,
        margin: '0 auto',
        marginBottom: 16
    }
}))

export default function Request(){
    const classes = styles();
    const firebase = useFirebase();
    const [success, toggleSuccess] = useState(false);

    const [values, setValues] = useState({
        email: '',
    })
    const [errors, setErrors] = useState({
        email: '',
    })

    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };
    
    
    const handleRequestSubmit = async (event) =>{
        event.preventDefault();
        const {email} = values; 
        setErrors({        
            email: ''
        });

        try {
            await firebase.resetPassword(email);
            toggleSuccess(true);
        } catch (error) {
            switch(error.code) {
                case 'auth/argument-error':
                    return setErrors(errors => ({...errors, email: error.message}));
                case 'auth/user-not-found':
                    return setErrors(errors => ({...errors, email: 'There is no user record for this identifier.'}));
                default: 
                    return;
            }
        }
    }



    return (
        <FormPage icon={<EmailIcon/>} title={success ? 'Check Your Email' : 'Reset Your Password'}>
            {success ? 
                <>
                    <Typography className={classes.text}>
                        A password reset link has been sent to your email address.
                    </Typography>
                </>:
                <>
                    <form onSubmit={handleRequestSubmit} className={classes.form}>
                        <TextField
                            error={Boolean(errors.email)}
                            helperText={errors.email && <Error>{errors.email}</Error>}
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
                </>
            }
        </FormPage> 
    )
}