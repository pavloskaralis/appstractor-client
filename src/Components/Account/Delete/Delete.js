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
import InputLabel from '@material-ui/core/InputLabel'

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
        minWidth: '100%',
        maxWidth: '100%',
        marginBottom: 12,
        fontSize: 16,
        padding: '16px 12px 10px 12px',
        fontFamily: 'roboto',
        minHeight: 56,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        border: 'solid 2px transparent',
        '&:focus':{
            border: `solid 2px ${theme.palette.secondary.main}`,
            outline: 'none'
        }
    }
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
                <TextareaAutosize 
                    rowsMin={1} 
                    className={classes.textArea} 
                    aria-label="empty textarea" 
                    placeholder="Why are you deleting your account?" 
                    value={values.reason}
                    id='reason'
                    onChange={handleInputChange}
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