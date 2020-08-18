import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent  from '@material-ui/core/DialogContent'
import {toggleLinkDialog, toggleCreateClicked, toggleFirstRender} from '../../../../Actions/Interface/allInterfaceActions'
import Icon from '@material-ui/core/Icon'
import LinkIcon from '@material-ui/icons/Link'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Error from '../../../FormPage/Error/Error'
import isImageUrl from 'is-image-url'
import setImage from '../../../../Actions/Canvas/setImage';


const styles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2),
    },
    avatar:{
        margin: '0 auto',
        background: theme.palette.secondary.main,
    },
    icon: {
        margin: '0 auto',
        color: theme.palette.text.primary,
    },
    form: {
        '& .MuiFormHelperText-root':{
            backgroundColor: theme.palette.background.paper,
        },
    },
    content: {
        maxWidth: 344
    }
}))

export default function LinkDialog(){
    const classes = styles(); 
    const dispatch = useDispatch();
    const linkDialog = useSelector(state => state.interface.linkDialog);

    const [values, setValues] = useState({
        link: '',
    })
    const [errors, setErrors] = useState({
        link: '',
    })


    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };

    const handleClose = () => {
       dispatch(toggleLinkDialog(false))
    };
  

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {link} = values; 
        setErrors({        
            link: '',
        }); 
        if(!isImageUrl(link)) {
            return setErrors(errors => ({...errors, link:'Not a valid image url.'}))
        }
        dispatch(toggleCreateClicked(false))
        dispatch(toggleFirstRender(true))
        dispatch(setImage(link))
        //delay to stop animation
        setTimeout(()=> {
            dispatch(toggleLinkDialog(false))  
        },0)
    }

    return (
        <Dialog onClose={handleClose} open={Boolean(linkDialog)}>
            <DialogContent className={classes.content}>
                <Avatar className={classes.avatar}>
                    <Icon className={classes.icon}>
                        <LinkIcon/>
                    </Icon>
                </Avatar>
                <Typography className={classes.title} variant='h6'>Provide an Image Url</Typography>
      
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        error={Boolean(errors.link)}
                        helperText={errors.link && <Error>{errors.link}</Error>}
                        color='secondary'
                        id='link'
                        label='Image URL'
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        variant='filled'
                    />
                    <Button  type='submit' fullWidth color='secondary' variant='contained'>Submit Link</Button>
                </form>
            </DialogContent>
            
        </Dialog>
    );
         
  
}