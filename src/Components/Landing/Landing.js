import React from 'react'
import Box from '@material-ui/core/Box'
import Canvas from '../Canvas/Canvas'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Link} from 'react-router-dom';

const styles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.background.default,
    },
    purpleGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: .95,
        background: `linear-gradient(to top, ${theme.palette.primary.dark}, ${theme.palette.primary.dark} 25%, transparent)`
    },
    blackGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: .95,
        background: `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent 50%)`
    },
    title: {
        textTransform: 'uppercase',
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
        textAlign: 'center',
        fontSize: theme.typography.h4.fontSize,
        marginBottom: '-8px',
        [theme.breakpoints.up(450)]: {
            marginBottom: '-14px',
            fontSize: theme.typography.h3.fontSize
        },
        [theme.breakpoints.up('sm')]: {
            marginBottom: '-8px',
            fontSize: theme.typography.h2.fontSize
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: '-24px',
            fontSize: theme.typography.h1.fontSize
        } 
    },
    slogan: {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightMedium,
        textAlign: 'center',
        fontSize: '19px',
        [theme.breakpoints.up(450)]: {
            fontSize: '27px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '24px'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '44px'
        }  
    },
    description:{
        color: theme.palette.text.primary,
        textAlign: 'center',
        fontSize: '10px',
        marginBottom: '10px',
        [theme.breakpoints.up(450)]: {
            fontSize: '14px',
            marginBottom: '14px'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '22px',
            marginBottom: '22px'
        }  
    },
    button: {
        minWidth: 105,
        maxWidth: 105,
        height: 36,
        fontSize: 13,
        [theme.breakpoints.up('md')]: {
            minWidth: 120,
            maxWidth: 120, 
            height: 42,
            fontSize: 15
        } 
    },
    demoButton: {
        backgroundColor: theme.palette.text.primary,
        minWidth: 105,
        maxWidth: 105,
        height: 36,
        fontSize: 13,
        [theme.breakpoints.up('md')]: {
            minWidth: 120,
            maxWidth: 120, 
            height: 42,
            fontSize: 15
        }, 
        '&.MuiButton-contained':{
            color: theme.palette.secondary.main,
        }
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '0 auto',
        width: 250,
        [theme.breakpoints.up(450)]: {
            width: 360
        },
        [theme.breakpoints.up('md')]: {
            width: 600
        } 
    },
    link:{
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'none',
        [theme.breakpoints.up(450)]: {
            marginTop: 14,
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 22,
        } ,
        '&:hover':{
            textDecorationLine: 'underline',
        }
    }
}))

export default function Landing(){
    const classes = styles(); 
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Box display='flex' width='100%' height='100%' justifyContent='space-evenly' flexDirection={'column'}>
            <Box width='100%' height='100%' position='absolute'>
                <Canvas/>
            </Box>
            <Box className={classes.blackGradient}/>
            <Box className={classes.purpleGradient}/>
            <Box zIndex={1} width='100%' display='flex' flexDirection='column'>
                <Typography className={classes.title}>Appstractor</Typography>
                <Box width='100%' display='flex' justifyContent='center' flexDirection={matches ? 'row' : 'column'}>
                    <Typography className={classes.slogan}>Create art with the click of a</Typography>
                    <Box margin={matches ? '0 0 0 12px' : '4px auto 0 auto'}height='100%' display='flex' flexDirection='column' justifyContent='center'>
                        <Button  variant='contained' color='primary' className={classes.button}>Button</Button>
                    </Box>
                </Box>
            </Box>
            <Box zIndex={1} width='100%' display='flex' flexDirection='column'>
                <Typography className={classes.slogan}>WORKS ON ANY IMAGE</Typography>
                <Typography className={classes.description}>
                    Choose from endless stock photos or upload your own.<br/>
                    Intuitive controls help you craft the perfect centerpiece.<br/> 
                    Easily download your creations and share with friends.
                </Typography>
                <Box className={classes.buttonContainer}>
                    <Button variant='contained' color='secondary' className={classes.button}>
                        Sign Up
                    </Button>
                    <Button  variant='contained' color='default' className={classes.demoButton}>
                        Try Demo
                    </Button>
                </Box>
                <Link className={classes.link}>
                    Already have an account? Log In
                </Link>
            </Box>
        </Box>
    )
}