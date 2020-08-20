import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'
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
import {useInView} from 'react-intersection-observer';

const styles = makeStyles(theme => ({
    card: {
        minHeight: 190,
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 4,
        overflow: 'hidden', 
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
        transition:'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;', 

    },
    title: {
        color: theme.palette.text.primary
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
        transition:'border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;', 
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



export default function Stock({url,name,link}) {
    const classes = styles(); 
    const [select, toggleSelect] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);  
    const [ref, inView] = useInView({
        triggerOnce: true, 
        threshold: 0,
        rootMargin: '0px 0px -15px 0px'
    })

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (event) => {
        toggleSelect(event.target.checked)
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.target)
    }

    return(
        
        <Box ref={ref} className={classes.card} style={{opacity: inView ? 1 : 0}} >
            { inView && 
                <>
                    <Box border={select ? 'solid 2px #2196f3' : 'solid 2px transparent'} className={classes.border}/>
                 
                    <CardMedia
                        className={classes.cardMedia}
                        image={url}
                        title="Image title"
                    />    
                </>
            }
        </Box>

    )
}