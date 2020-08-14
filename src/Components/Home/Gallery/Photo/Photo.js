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
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TitleIcon from '@material-ui/icons/Title'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'


const styles = makeStyles(theme => ({
    card: {
        cursor: 'pointer',
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
        width: '100%',
        '& .MuiButtonGroup-groupedTextHorizontal:not(:last-child)':{
            border: 'none'
        }
    },
    button: {
        width: '100%',
        borderRadius: 0,
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
        borderRadius: 4,
        transition:'border 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;', 
        position:'absolute',
        height:'100%',
        width:'100%',
    },
    iconButton: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        backgroundColor: 'rgba(0, 0, 0, 0.25);',
        '&:hover':{
            backgroundColor: 'rgba(0, 0, 0, 0.29)'
        }
    },

    icon:{
        marginRight: theme.spacing(2)
    }

}))



export default function () {
    const classes = styles(); 
    const [select, toggleSelect] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)

 
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (event) => {
        toggleSelect(event.target.checked)
    }

    return(
            <Card className={classes.card} >
                <Box border={select ? 'solid 2px #2196f3' : 'solid 2px transparent'} className={classes.border}/>
                <IconButton onClick={handleMenuClick} size='small' className={classes.iconButton} aria-label='actions'>
                    <Tooltip title="Actions" aria-label="Actions">
                        <MoreVertIcon />
                    </Tooltip>
                </IconButton> 
                <Menu 
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem id='Edit'>
                        <EditIcon fontSize='small' className={classes.icon}/>Edit
                    </MenuItem>
                    <MenuItem id='Rename' >
                        <TitleIcon fontSize='small' className={classes.icon}/>Rename
                    </MenuItem>
                    <MenuItem id='Delete' >
                        <DeleteForeverIcon fontSize='small' className={classes.icon}/>Delete
                    </MenuItem>
                </Menu>     
                
                <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
                />
                
                <ButtonGroup  variant='text' className={classes.group}>
                  
                    <Button classes={{root: classes.button, label:classes.label}} size="small" color="default">
                        View
                    </Button>
                    <Button classes={{root: classes.button, label:classes.label}} size="small" color="default">
                        Download
                    </Button>
                    <Button classes={{root: classes.button, label:classes.label}} size="small" color="default">
                        Link
                    </Button>
                    <Button classes={{root: classes.button, label:classes.label}} startIcon={<FacebookIcon className={classes.facebook}/>} size="small" color="default">
                        Share
                    </Button>
                </ButtonGroup>

                <Box className={classes.cardContent}>
                    <Checkbox
                        size='small'
                        checked={select}
                        onChange={handleCheckboxChange}
                        name="confirm"
                        className={classes.checkbox}
                    />
                    <Box display='flex' height='100%' flexDirection='column' justifyContent='center'>
                        <Typography variant="h6" >
                            Title
                        </Typography>
                    </Box>

                </Box>
            </Card>
    )
}