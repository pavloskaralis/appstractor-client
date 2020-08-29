import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WarningIcon from '@material-ui/icons/Warning'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {HOME} from '../../Routes/routes'
import FormPage from '../FormPage/FormPage'
import Typography from '@material-ui/core/Typography'
import {useHistory} from 'react-router-dom'

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

export default function Signup(){
    const classes = styles();
    const history = useHistory();

    const handleClick = () =>{
        history.goBack();  
    }

    return (
        <FormPage icon={<WarningIcon/>} title='Page Not Found'>

            <Typography className={classes.text}>
                The content you are looking for does not exist or has been removed from the site.
            </Typography>
            <Box margin='0 auto'>
                <Button onClick={handleClick} color="secondary"  variant='contained'>
                    Go Back
                </Button>
            </Box>

            <Link component={RouterLink} to={HOME} className={classes.link}>
                Return to Home
            </Link>
        </FormPage> 
    )
}