import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {useInView} from 'react-intersection-observer'
import {updateSelected, setSnackbar} from '../../../../Actions/Interface/allInterfaceActions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Actions from './Actions/Actions'

const styles = makeStyles(theme => ({
    card: {
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        minHeight: 250,
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
}))



export default function Photo({uid, doc, image:{url,title}}) {
    const classes = styles(); 
    const history = useHistory(); 
    const dispatch = useDispatch(); 
    const selected = useSelector(state => state.interface.selected)
    const [isSelected, toggleIsSelected]= useState(false);

    const [anchorEl, setAnchorEl] = useState(null);  
    const [ref, inView] = useInView({
        triggerOnce: true, 
        threshold: 0,
        rootMargin: '0px 0px -15px 0px'
    })

    useEffect(()=> {
        selected.find(obj => obj.doc === doc) ? toggleIsSelected(true) : toggleIsSelected(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selected])

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (event) => {
        event.stopPropagation(); 
         //remove from selected if select toggled false 
        if(isSelected) {
            dispatch(updateSelected(selected.filter(obj => obj.doc !== doc)));
        //add to selected if select toggled true
        } else if (!isSelected) {
            dispatch(updateSelected([...selected,{doc, title}]));
        }
    }

    const handleMenuClick = (event) => {
        event.stopPropagation(); 
        setAnchorEl(event.target)
    }

    const openLightbox = (event) => {
        event.stopPropagation();
        history.push('/gallery/' + title);
    }

    const buttonDownload = (event) => {
        event.stopPropagation();
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            const blob = xhr.response;
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = `appstractorart_${title}`;
            a.href = blobUrl;
            a.click();          
        };
        xhr.open('GET',url);
        xhr.send()         
    } 

    const copyLink = (event) => {
        event.stopPropagation();
        const el = document.createElement('textarea');
        el.value = `https://www.appstractorart.com/view/${uid}/${title}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        dispatch(setSnackbar({success: true, message:'Link copied to clipboard.'}))
    }

    const facebookShare = (event) => {
        event.stopPropagation();
        window.FB.ui(
            {
                method: 'share',
                href: url,
                // href: `https://www.appstractorart.com/view/${uid}/${title}`,   
            },
            null
        );       
    }

    return(
        <div onDoubleClick={openLightbox} ref={ref} className={classes.card} style={{opacity: inView ? 1 : 0}} onClick={handleCheckboxChange} >
            { inView && 
                <>
                    <div style={{border:isSelected ? 'solid 2px #2196f3' : 'solid 2px transparent'}} className={classes.border}/>
                    <IconButton onClick={handleMenuClick} size='small' className={classes.iconButton} aria-label='actions'>
                        <MoreVertIcon />
                    </IconButton> 
                    <Menu 
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onClick={(e)=>e.stopPropagation()}
                        onDoubleClick={(e)=>e.stopPropagation()}
                    >
                        <Actions title={title} doc={doc} handleClose={handleClose}/>
                    </Menu>     
                    
                    <CardMedia
                        className={classes.cardMedia}
                        image={url}
                        title={title}
                    />
                    
                    <ButtonGroup  variant='text' className={classes.group}>
                        <Button 
                            onClick={openLightbox}  
                            classes={{root: classes.button, label:classes.label}} 
                            size="small" color="default"
                            onDoubleClick={(e)=>e.stopPropagation()}
                        >
                            View
                        </Button>
                        <Button 
                            onClick={buttonDownload} 
                            classes={{root: classes.button, label:classes.label}} 
                            size="small" color="default"
                            onDoubleClick={(e)=>e.stopPropagation()}
                        >
                            Download
                        </Button>
                        <Button 
                            onClick={copyLink} 
                            classes={{root: classes.button, label:classes.label}} 
                            size="small" color="default"
                            onDoubleClick={(e)=>e.stopPropagation()}
                        >
                            Link
                        </Button>
                        <Button 
                            onClick={facebookShare} 
                            classes={{root: classes.button, label:classes.label}} 
                            startIcon={<FacebookIcon className={classes.facebook}/>} 
                            size="small" color="default"
                            onDoubleClick={(e)=>e.stopPropagation()}
                        >
                            Share
                        </Button>
                    </ButtonGroup>

                    <div className={classes.cardContent}>
                        <Checkbox
                            size='small'
                            checked={isSelected}
                            name="confirm"
                            className={classes.checkbox}
                        />
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center'}}>
                            <Typography className={classes.title} variant="h6" >
                                {title}
                            </Typography>
                        </div>

                    </div>
                </>
            }
        </div>

    )
}