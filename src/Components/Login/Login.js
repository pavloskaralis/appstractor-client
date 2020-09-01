import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {SIGNUP,RECOVER, HOME} from '../../Routes/routes'
import FormPage from '../FormPage/FormPage'
import { useFirebase } from 'react-redux-firebase'
import Error from '../FormPage/Error/Error'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import resetInterface from '../../Actions/Interface/resetInterface'
import resetCanvas from '../../Actions/Canvas/resetCanvas' 
import setImage from '../../Actions/Canvas/setImage';
import NotChrome from '../NotChrome/NotChrome'

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

export default function Login(){
    const classes = styles();
    const history = useHistory();
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const [isChrome] = useState(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));

    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    })

    const [visibility, toggleVisibility] = useState(false)

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

        try {
            await firebase.login({email, password});
            dispatch(setImage(''))
            
            setTimeout(()=> {
                dispatch(resetCanvas())
                dispatch(resetInterface())
                history.push(HOME)
            },0)
        } catch (error) {
            switch(error.code) {
                case 'auth/invalid-email':
                    return setErrors(errors => ({...errors, email: error.message}));
                case 'auth/user-not-found':
                    return setErrors(errors => ({...errors, email: 'There is no user record for this identifier.'}));
                case 'auth/wrong-password': 
                    return setErrors(errors => ({...errors, password: 'The password is invalid'}));
                default: 
                    return;
            }
        }
      
    }

    if(!isChrome){
        return <NotChrome/>
    }

    return (
        <FormPage icon={<LockIcon/>} title='Access an Existing Account'>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                    inputProps={{ maxLength: 48 }}
                />
                <TextField
                    error={Boolean(errors.password)}
                    helperText={errors.password && <Error>{errors.password}</Error>}
                    color='secondary'
                    id='password'
                    label='Password'
                    type={visibility ? 'text' : 'password'}            
                    required
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    variant='filled'
                    inputProps={{ maxLength: 48 }}
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
                <Button  type='submit' fullWidth color='secondary' variant='contained'>Log In</Button>
            </form>
            <Box display='flex' width='296px' margin='0 auto' justifyContent='space-between'>
                <Link component={RouterLink} to={RECOVER} className={classes.link}>
                    Forgot password?
                </Link>
                <Link component={RouterLink} to={SIGNUP} className={classes.link}>
                    Need an account? Sign Up
                </Link>
            </Box>
        </FormPage> 
    )
}