import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import LockIcon from '@material-ui/icons/Lock'
import WarningIcon from '@material-ui/icons/Warning'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import {LOGIN, HOME, RECOVER} from '../../../Routes/routes'
import FormPage from '../../FormPage/FormPage'
import { useFirebase } from 'react-redux-firebase'
import Error from '../../FormPage/Error/Error'
import {useHistory} from 'react-router-dom'
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

export default function Reset({code, resetCode}){
    const classes = styles();
    const firebase = useFirebase();
    const history = useHistory();
    const [invalid, toggleInvalid] = useState(false);
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

    const handleResetSubmit = async (event) =>{
        event.preventDefault();

        const {password, confirm} = values; 
        setErrors({        
            password: '',
            confirm: '',
        });

        if(password !== confirm){
           return setErrors(errors => ({...errors, confirm:'Passwords do not match.'}))
        }

        try {
            await firebase.auth().confirmPasswordReset(code, password);
            history.push(LOGIN)
        } catch (error) {
            switch(error.code) {
                case 'auth/invalid-action-code':
                    return toggleInvalid(true);
                case 'auth/weak-password': 
                    return setErrors(errors => ({...errors, password: error.message}));
                default: 
                    return;
            }
        }
      
    }

    
    return (
        <FormPage icon={invalid? <WarningIcon/> : <LockIcon/>} title={invalid ? 'Invalid Action Code' : 'Change Your Password'}>
            {invalid ? 
                <>
                    <Typography className={classes.text}>
                        This can happen if the code is malformed or expired.
                    </Typography>
                    <Box margin='0 auto'>
                        <Button onClick={resetCode} component={RouterLink} to={RECOVER} color="secondary" type='submit'  variant='contained'>
                            Try Again
                        </Button>
                    </Box>

                    <Link component={RouterLink} to={LOGIN} className={classes.link}>
                        Return to Login
                    </Link>
                </> :
                <>
                    <form onSubmit={handleResetSubmit} className={classes.form}>
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
                    <Button type='submit' fullWidth color='secondary' variant='contained'>
                        Change Password
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