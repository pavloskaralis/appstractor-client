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

}))

export default function Signup(){
    const classes = styles();
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.firebase.profile);
    const [visibility, toggleVisibility] = useState(false)


    const [values, setValues] = useState({
        current: '',
        newPassword: '',
        confirm: '',
    })
    const [errors, setErrors] = useState({
        current: '',
        newPassword: '',
        confirm: ''
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
        const {current, newPassword, confirm} = values; 
        setErrors({        
            current: '',
            newPassword: '',
            confirm: ''
        });

        if( newPassword !== confirm){
            return setErrors(errors => ({...errors, confirm:'Passwords do not match.'}))
        }

        const credential = firebase.auth.EmailAuthProvider.credential(
            profile.email,
            current
        );

        try {
           
            await firebase.reauthenticate({credential});
            await firebase.auth().currentUser.updatePassword(newPassword)

            setValues({
                current: '',
                newPassword: '',
                confirm: ''
            });
            dispatch(setSnackbar({success:true, message: 'Password has been changed.'}));

        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password': 
                    return setErrors(errors => ({...errors, current: 'The password is invalid'}));
                case 'auth/weak-password': 
                    return setErrors(errors => ({...errors, newPassword: error.message}));
                default: 
                    return;
            }
        } 
    }

    return (
        <FormPage icon={<LockIcon/>} title='Change Login Password'>

            <form onSubmit={handleSubmit} className={classes.form}>
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
                    error={Boolean(errors.current)}
                    helperText={errors.current && <Error>{errors.current}</Error>}
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
                    id='newPassword'
                    label='New Password'
                    type={visibility ? 'text' : 'password'}            
                    required
                    fullWidth
                    value={values.newPassword}
                    onChange={handleChange}
                    variant='filled'
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword && <Error>{errors.newPassword}</Error>}
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
                    error={Boolean(errors.confirm)}
                    helperText={errors.confirm && <Error>{errors.confirm}</Error>}
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