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
import {LOGIN} from '../../Routes/routes'
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

export default function Signup(){
    const classes = styles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirm: '',
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
        <FormPage icon={<PersonIcon/>} title='Create a New Account'>
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
                <TextField
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
                <Button className={classes.button} type='submit' fullWidth color='secondary' variant='contained'>Sign Up</Button>
            </form>
            <Link component={RouterLink} to={LOGIN} className={classes.link}>
                Already have an account? Log In
            </Link>
        </FormPage> 
    )
}