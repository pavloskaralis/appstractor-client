import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {HOME} from '../../../Routes/routes'
import FormPage from '../../FormPage/FormPage'
import Typography from '@material-ui/core/Typography'
import {useSelector, useDispatch} from 'react-redux'
import { useFirebase } from 'react-redux-firebase';
import setSnackbar from '../../../Actions/Interface/setSnackbar';
import Error from '../../FormPage/Error/Error'

const styles = makeStyles(theme => ({
    form: {
        margin:'0 auto',
        width: 296
    },
    link:{
        margin: '0 auto',
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    email: {
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(-2)
    }
}))

export default function  Email(){
    const classes = styles();
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.firebase.profile);
    const [visibility, toggleVisibility] = useState(false)
    const [updating, toggleUpdating] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    })


    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };
    
    const handleClickShowPassword = (event) => {
        event.preventDefault();
        toggleVisibility(visibility => !visibility)   
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {email, password} = values; 
        setErrors({        
            email: '',
            password: '',
        });

        const credential = firebase.auth.EmailAuthProvider.credential(
            profile.email,
            password
        );
        try {
            toggleUpdating(true)
            await firebase.reauthenticate({credential});
            await firebase.updateEmail(email, true);
            toggleUpdating(false)
            setValues({
                email: '',
                password: ''
            });
            dispatch(setSnackbar({success:true, message: 'Email has been updated.'}))
        } catch (error) {
            toggleUpdating(false)
            switch(error.code) {
                case 'auth/wrong-password': 
                    return setErrors(errors => ({...errors, password: 'The password is invalid'}));
                case 'auth/email-already-in-use':
                    return setErrors(errors => ({...errors, email: 'The email address is already in use.'}));
                case 'auth/invalid-email':
                    return setErrors(errors => ({...errors, email: error.message}));
                default: 
                    return;
            }
        } 
    }


    return (
        <FormPage icon={<EmailIcon/>} title='Change Login Email Address'>
            <Typography className={classes.email}>{!updating ? profile.email : 'Updating...'}</Typography>
            <form onSubmit={handleSubmit}  className={classes.form}>
                <TextField
                    color='secondary'
                    id='email'
                    label='New Email Address'
                    required
                    fullWidth
                    value={values.email}
                    error={Boolean(errors.email)}
                    helperText={errors.email && <Error>{errors.email}</Error>}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    color='secondary'
                    id='password'
                    label='Password'
                    type={visibility ? 'text' : 'password'}            
                    required
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    variant='filled'
                    error={Boolean(errors.password)}
                    helperText={errors.password && <Error>{errors.password}</Error>}
                    InputProps={{
                        endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                            {visibility ? 
                                <Visibility  /> : <VisibilityOff />
                            }
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <Box height='16px'/>
                <Button type='submit' fullWidth color='secondary' variant='contained'>
                    Change Email Address
                </Button>
            </form>
           
            <Link component={RouterLink} to={HOME} className={classes.link}>
                Return to Home
            </Link>
      
        </FormPage> 
    )
}