import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Checkbox from '@material-ui/core/Checkbox'

const styles = makeStyles(theme => ({
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1),
        flexGrow: 1,
        width: '100%', 
        [theme.breakpoints.up('sm')]:{
            width: 'calc(50% - 16px)', 
            maxWidth: 'calc(50% - 16px)', 
        },
        [theme.breakpoints.up('md')]:{
            width: 'calc(33.33% - 16px)',
            maxWidth: 'calc(33.33% - 16px)', 
        },

    },
    cardMedia: {
        paddingTop: '66.66%', 
    },
    cardContent: {
        display: 'flex',
    },
    checkbox: {
        color: theme.palette.secondary.main,
        margin: theme.spacing(1)
    },
    group:{
        margin: '0 auto',
        justifyContent: 'space-evenly',
        padding: theme.spacing(1,0),  
    },
    button: {
        minWidth: 67
    },
    label: {
        fontSize: theme.typography.pxToRem(10),
    },
    facebook:{
        width: 12.5,
        marginRight: theme.spacing(-.5),
        marginTop: theme.spacing(-.2)
    }, 
    border:{
        transition:'border 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;', 
        position:'absolute',
        height:'100%',
        width:'100%',
    }
}))



export default function () {
    const classes = styles(); 
    const [select, toggleSelect] = useState(false);

    const handleCheckboxChange = (event) => {
        toggleSelect(event.target.checked)
    }
    return(
            <Card className={classes.card} >
                <Box border={select ? 'solid 2px #2196f3' : 'solid 2px transparent'} className={classes.border}/>
                <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
                />
                
                <ButtonGroup variant='text' className={classes.group}>
                    <Button classes={{root: classes.button, label:classes.label}} size="small" color="default">
                        View
                    </Button>
                    <Button classes={{root: classes.button, label:classes.label}} startIcon={<FacebookIcon className={classes.facebook}/>} size="small" color="default">
                        Share
                    </Button>
                    <Button classes={{root: classes.button, label:classes.label}} size="small" color="default">
                        Link
                    </Button>
                    <Button classes={{root: classes.button, label:classes.label}} size="small" color="default">
                        Download
                    </Button>

                </ButtonGroup>

                <Box className={classes.cardContent}>
                    <Checkbox
                        checked={select}
                        onChange={handleCheckboxChange}
                        name="confirm"
                        className={classes.checkbox}
                    />
                    <Box display='flex' height='100%' flexDirection='column' justifyContent='center'>
                        <Typography variant="h6" >
                            Heading
                        </Typography>
                    </Box>

                </Box>
            </Card>
    )
}