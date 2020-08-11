import React from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const styles = makeStyles(theme => ({
    box:{
        backgroundColor: theme.palette.primary.dark,
        display:'flex',
        width:'100%',
        height:'100%' ,
        justifyContent:'space-evenly',
        flexDirection:'column',
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
}))

export default function FormPage({icon, title, children}){
    const classes = styles();

    return (
        <Box className={classes.box}>
            <Box display='flex' flexDirection='column'>
                <Avatar className={classes.avatar}>
                    <Icon className={classes.icon}>
                        {icon}
                    </Icon>
                </Avatar>
                <Typography className={classes.title} variant='h6'>{title}</Typography>
                {children}
            </Box>
            <div/>
        </Box>
    )
}