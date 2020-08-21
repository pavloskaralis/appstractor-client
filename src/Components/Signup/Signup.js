import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {LOGIN, HOME} from '../../Routes/routes'
import FormPage from '../FormPage/FormPage'
import { useFirebase } from 'react-redux-firebase'
import Error from '../FormPage/Error/Error'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import resetInterface from '../../Actions/Interface/resetInterface'
import resetCanvas from '../../Actions/Canvas/resetCanvas' 

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


export default function Signup(){
    const classes = styles();
    const history = useHistory();
    const firebase = useFirebase();
    const dispatch = useDispatch();

    //form values
    const [values, setValues] = useState({    
        email: '',
        password: '',
        confirm: '',
    });
    //form errors; password match, email in use, invalid email, weak password
    const [errors, setErrors] = useState({    
        email: '',
        password: '',
        confirm: '',
    });
    //password visibility
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

        const {email, password, confirm} = values; 
        setErrors({        
            email: '',
            password: '',
            confirm: '',
        });

        if(password !== confirm){
           return setErrors(errors => ({...errors, confirm:'Passwords do not match.'}))
        }

        try {
            await firebase.createUser({email, password});
            firebase.updateProfile({
                email,
                interface: {
                    rerender: false,
                    animation: true,
                } ,
                subcollections: [{collection:'appstractions'}]
            });

            dispatch(resetCanvas())
            dispatch(resetInterface())
            
            history.push(HOME);
        } catch (error) {
            switch(error.code) {
                case 'auth/email-already-in-use':
                    return setErrors(errors => ({...errors, email: 'The email address is already in use.'}));
                case 'auth/invalid-email':
                    return setErrors(errors => ({...errors, email: error.message}));
                case 'auth/weak-password': 
                    return setErrors(errors => ({...errors, password: error.message}));
                default: 
                    return;
            }
        }
      
    }
    
    return (
        <FormPage icon={<PersonIcon/>} title='Create a New Account'>
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
                <TextField
                    error={Boolean(errors.confirm)}
                    helperText={errors.confirm && <Error>{errors.confirm}</Error>}
                    color='secondary'
                    id='confirm'
                    label='Confirm Password'
                    type={visibility ? 'text' : 'password'}            
                    required
                    fullWidth
                    value={values.confirm}
                    onChange={handleChange}
                    variant='filled'
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
                <Button type='submit' fullWidth color='secondary' variant='contained'>Sign Up</Button>
            </form>
            <Link component={RouterLink} to={LOGIN} className={classes.link}>
                Already have an account? Log In
            </Link>
        </FormPage> 
    )
}