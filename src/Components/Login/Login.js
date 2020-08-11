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
import {SIGNUP,RECOVER} from '../../Routes/routes'
import FormPage from '../FormPage/FormPage'

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
    const [values, setValues] = useState({
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

    return (
        <FormPage icon={<LockIcon/>} title='Access an Existing Account'>
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
                <Button className={classes.button} type='submit' fullWidth color='secondary' variant='contained'>Log In</Button>
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