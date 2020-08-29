import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FeedbackIcon from '@material-ui/icons/Feedback'
import {useHistory, Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {HOME} from '../../Routes/routes'
import FormPage from '../FormPage/FormPage'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'
import {useFirestore} from 'react-redux-firebase'
import {useSelector} from 'react-redux'

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
    label: {
        color: theme.palette.text.primary
    },
    ratingLabel: {
        color: theme.palette.text.primary,
        textAlign: 'center'
    },
    text: {
        color: theme.palette.text.primary,
        textAlign: 'center',
        maxWidth: 296,
        margin: '0 auto',
        marginBottom: 16,
        marginTop: -16
    },
    link:{
        margin: '0 auto',
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginTop: 16,
    },  
}))

export default function Feedback(){
    const classes = styles();
    const history = useHistory();
    const firestore = useFirestore();
    const profile = useSelector(state => state.firebase.profile);
    const [submitted, toggleSubmitted] = useState(false);

    const [values, setValues] = useState({
        how: '',
        why:'',
        what:''
    });
    const [rating, setRating] = useState(null);


    const handleInputChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        setValues(values => ({ ...values, [id]: value }));
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue)
    }

    const handleClick = () =>{
        history.goBack();  
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const {how, why, what} = values; 

        firestore.collection('feedback').add({
            email: profile.email,
            how, why, what, rating
        })

        toggleSubmitted(true);
    }


    return (
        <FormPage icon={<FeedbackIcon/>} title={submitted ? 'Thank You!' : 'Send Us Your Feedback'}>
            {submitted ?
                <>
                    <Typography className={classes.text}>
                        contact@appstractorart.com
                    </Typography>
                    <Box margin='0 auto'>
                        <Button onClick={handleClick} color="secondary" type='submit'  variant='contained'>
                            Go Back
                        </Button>
                    </Box>    
                    <Link component={RouterLink} to={HOME} className={classes.link}>
                        Return to Home
                    </Link>
                </>:
                <>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Box marginTop='-16px' marginBottom='16px' >
                            <Typography className={classes.text}>
                                contact@appstractorart.com
                            </Typography>
                        
                            <Typography className={classes.ratingLabel}>Overall Rating</Typography>
                            <Box display='flex' justifyContent='center' width='100%'>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={handleRatingChange}
                                    required
                                />
                            </Box>  
                        </Box>
                        <TextField
                            color='secondary'
                            id='how'
                            label='How did you find this app?'
                            fullWidth
                            value={values.how}
                            onChange={handleInputChange}
                            variant='filled'
                            multiline
                        />
                        <TextField
                            color='secondary'
                            id='why'
                            label='Why do you use this service?'
                            fullWidth
                            value={values.why}
                            onChange={handleInputChange}
                            variant='filled'
                            multiline
                        />
                        <TextField
                            color='secondary'
                            id='what'
                            label='What can we improve on?'
                            fullWidth
                            value={values.what}
                            onChange={handleInputChange}
                            className={classes.textArea}
                            variant='filled'
                            multiline
                        />
                        <Box height='16px'/>
                        <Button color="secondary" type='submit' fullWidth variant='contained'>
                            Send Feedback
                        </Button>
                    </form>
                    <Link component={RouterLink} to={HOME} className={classes.link}>
                        Return to Home
                    </Link>
                </>
            }
           
        </FormPage> 
    )
}