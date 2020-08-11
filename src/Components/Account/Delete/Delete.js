import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WarningIcon from '@material-ui/icons/Warning'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {HOME} from '../../../Routes/routes'
import FormPage from '../../FormPage/FormPage'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

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
        marginBottom: 16
    },  
    disabled: {
        backgroundColor: `${theme.palette.secondary.dark} !important`
    },
    checkbox: {
        color: theme.palette.text.primary,
        '&.MuiCheckbox-colorSecondary.Mui-checked':{
            color: theme.palette.text.primary
        },
    },
    formControl: {
        margin: '0 auto'
    },
    label: {
        color: theme.palette.text.primary
    },
    textArea:{
        '& textarea':{
            '&::-webkit-scrollbar':{
                backgroundColor: theme.palette.text.secondary,
                borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
                border: `1px solid ${theme.palette.text.secondary} `
            },
        }
       
    },
}))

export default function Signup(){
    const classes = styles();
    const [values, setValues] = useState({
        password: '',
        reason:''
    })
    const [visibility, toggleVisibility] = useState(false)
    const [confirm, toggleConfirm] = useState(false);

    const handleInputChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };

    const handleCheckboxChange = (event) => {
        toggleConfirm(event.target.checked)
    }
    
    const handleClickShowPassword = (event) => {
        event.preventDefault();
        toggleVisibility(visibility => !visibility)   
    };

    return (
        <FormPage icon={<DeleteForeverIcon/>} title='Permanently Delete Account'>
            <form className={classes.form}>
                <TextField
                    color='secondary'
                    id='reason'
                    label='Why are you deleting your account?'
                    fullWidth
                    value={values.reason}
                    onChange={handleInputChange}
                    className={classes.textArea}
                    variant='filled'
                    multiline
                    // rows={1}
                    // rowsMax={5}
                />
                <TextField
                    color='secondary'
                    id='password'
                    label='Password'
                    type={visibility ? 'text' : 'password'}            
                    required
                    fullWidth
                    value={values.current}
                    onChange={handleInputChange}
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
                     <FormControlLabel
                        classes={{root: classes.formControl, label: classes.label}}
                        control={
                        <Checkbox
                            checked={confirm}
                            onChange={handleCheckboxChange}
                            name="confirm"
                            className={classes.checkbox}
                        />
                        }
                        label="All data will be permanently erased."
                    />
                <Box height='16px'/>
                <Button disabled={!confirm} startIcon={<WarningIcon/>} color="secondary" classes={{disabled: classes.disabled}} type='submit' fullWidth variant='contained'>
                    Delete Account
                </Button>
            </form>
            <Link component={RouterLink} to={HOME} className={classes.link}>
                Return to Home
            </Link>
        </FormPage> 
    )
}