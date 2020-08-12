import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {LOGIN,SIGNUP,DEMO} from '../../../Routes/routes'

const styles = makeStyles(theme => ({
    slogan: {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightMedium,
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(19),
        [theme.breakpoints.up(450)]: {
            fontSize: theme.typography.pxToRem(27),
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(24)
        },
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(44)
        }  
    },
    description:{
        color: theme.palette.text.primary,
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(10),
        marginBottom: 8,
        [theme.breakpoints.up(450)]: {
            fontSize: theme.typography.pxToRem(14),
            marginBottom: 12
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 22,
            marginBottom: 20
        }  
    },
    button: {
        minWidth: 105,
        maxWidth: 105,
        height: 36,
        fontSize: theme.typography.pxToRem(13),
        [theme.breakpoints.up('md')]: {
            minWidth: 120,
            maxWidth: 120, 
            height: 42,
            fontSize: theme.typography.pxToRem(15)
        } 
    },
    demoButton: {
        backgroundColor: theme.palette.text.primary,
        minWidth: 105,
        maxWidth: 105,
        height: 36,
        fontSize: theme.typography.pxToRem(13),
        [theme.breakpoints.up('md')]: {
            minWidth: 120,
            maxWidth: 120, 
            height: 42,
            fontSize: theme.typography.pxToRem(15)
        } 
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '0 auto',
        width: 240,
        [theme.breakpoints.up(450)]: {
            width: 260
        },
        [theme.breakpoints.up('md')]: {
            width: 480
        } 
    },
    link:{
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginTop: 8,
        [theme.breakpoints.up(450)]: {
            marginTop: 12,
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 20,
        } ,
    }
}))

export default function GroupB(){
    const classes = styles(); 
  

    return (
        <Box zIndex={1} width='100%' display='flex' flexDirection='column'>
            <Typography className={classes.slogan}>WORKS ON ANY IMAGE</Typography>
            <Typography className={classes.description}>
                Choose from endless stock photos or upload your own.<br/>
                Intuitive controls help you craft the perfect centerpiece.<br/> 
                Easily download your creations and share with friends.
            </Typography>
            <Box className={classes.buttonContainer}>
                <Button component={RouterLink} to={SIGNUP} variant='contained' color='secondary' className={classes.button}>
                    Sign Up
                </Button>
                <Button component={RouterLink} to={DEMO} variant='contained' color='default' className={classes.demoButton}>
                    Try Demo
                </Button>

            </Box>
            <Link component={RouterLink} to={LOGIN} className={classes.link}>
                Already have an account? Log In
            </Link>
        </Box>
    )
}