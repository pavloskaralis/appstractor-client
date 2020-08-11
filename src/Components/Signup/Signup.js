import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import Typography from '@material-ui/core/Typography'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar'
import {LOGIN} from '../../Routes/routes'

const styles = makeStyles(theme => ({
    box:{
        backgroundColor: theme.palette.primary.dark,
        display:'flex',
        minHeight:'568px',
        width:'100%',
        height:'100%' ,
        justifyContent:'space-evenly',
        flexDirection:'column',
    },
    inputWrap: {
        margin:'0 auto',
        width: 300
    },
    title: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        marginBottom: 16
    },
    avatar:{
        margin: '0 auto',
        background: theme.palette.secondary.main,
    },
    icon: {
        margin: '0 auto',
        color: theme.palette.text.primary,
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
        <Box className={classes.box}>
            <Box display='flex' flexDirection='column'>
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon className={classes.icon} />
                </Avatar>
                <Typography className={classes.title} variant='h6'>Create a New Account</Typography>
                <form className={classes.inputWrap}>
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
            </Box>
            <div/>
        </Box>
    )
}