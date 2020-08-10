import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery';


const styles = makeStyles(theme => ({
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
        },
        
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
}))

export default function GroupA(){
    const classes = styles(); 
    const matches = useMediaQuery('(min-width:600px)');

    return (
   
        <Box zIndex={1} width='100%' display='flex' flexDirection='column'>
            <Typography className={classes.title}>Appstractor</Typography>
            <Box width='100%' display='flex' justifyContent='center' flexDirection={matches ? 'row' : 'column'}>
                <Typography className={classes.slogan}>Create art with the click of a</Typography>
                <Box margin={matches ? '0 0 0 12px' : '4px auto 0 auto'}height='100%' display='flex' flexDirection='column' justifyContent='center'>
                    <Button  variant='contained' color='primary' className={classes.button}>Button</Button>
                </Box>
            </Box>
        </Box>
           
    )
}