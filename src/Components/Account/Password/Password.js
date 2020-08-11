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
import {HOME} from '../../../Routes/routes'
import FormPage from '../../FormPage/FormPage'


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
        current: '',
        new: '',
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
        <FormPage icon={<LockIcon/>} title='Change Login Password'>
            <form className={classes.form}>
                <TextField
                    color='secondary'
                    id='current'
                    label='Current Password'
                    type={visibility ? 'text' : 'password'}            
                    required
                    fullWidth
                    value={values.current}
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
                    id='new'
                    label='New Password'
                    type={visibility ? 'text' : 'password'}            
                    required
                    fullWidth
                    value={values.new}
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
                    label='Confirm New Password'
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
            <Link component={RouterLink} to={HOME} className={classes.link}>
                Return to Home
            </Link>
        </FormPage> 
    )
}