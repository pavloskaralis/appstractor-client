import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux'
import {useFirestoreConnect} from 'react-redux-firebase'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import {useHistory, useParams, Redirect} from 'react-router-dom'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Fade from '@material-ui/core/Fade'
import {PAGE_NOT_FOUND} from '../../../../Routes/routes'

const styles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(66,66,66,.9)',
        zIndex: 1201,
        overflow: 'auto'
    },
    dialog: {
        position: 'relative',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        backgroundColor: 'rgba(46,46,46,.85)',
        maxWidth: 930,
        margin: '0 auto',
        borderRadius: 0,  
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundSize: 'cover',
        [theme.breakpoints.up('xs')]: {
            width: '288px',
            minHeight: '192px'
        },
        [theme.breakpoints.up(400)]: {
            width: '369px',
            height: '246px'
        },
        [theme.breakpoints.up(500)]: {
            width: '468px',
            height: '312px'
        },
        [theme.breakpoints.up('sm')]: {
            width: '570px',
            height: '390px'
        },
        [theme.breakpoints.up(780)]: {
            width: '750px',
            height: '500px'
        },
        [theme.breakpoints.up('md')]: {
            width: '930px',
            height: '620px',
        },
        '@media (max-height: 688px) and (min-width:960px)': {
            width: '750px',
            height: '500px'
        },
    },
    iconButton: {
        color: theme.palette.text.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.25);',
        '&:hover':{
            backgroundColor: 'rgba(0, 0, 0, 0.29)'
        }
    },
    buttonContainer: {
        padding: theme.spacing(.5),
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]:{
            padding: theme.spacing(0, 1.5),
        }
    },
    title: {
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    backArrow: {
        transform: 'scale(-1,-1)',

        '& .MuiSvgIcon-root':{
            transform: 'scale(1,-1)'
        }
    },
    text: {
        textAlign: 'center',
        color: theme.palette.text.primary,     
        fontSize: theme.typography.pxToRem(13)
    },
    closeButton: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: 4,
        left: 4,
        [theme.breakpoints.up('sm')]:{
            top: 12,
            left: 12,
        }
    }
}))

export default function Lightbox() {
    const classes = styles(); 
    const history = useHistory();
    const params = useParams(); 
    const [lightbox, updateLightbox] = useState({
        index: null,
        length: null,
        url: null
    })
    //load appstractions
    const uid = useSelector(state => state.firebase.auth.uid);
    useFirestoreConnect([ { collection: 'users', doc: uid, subcollections: [{ collection: 'appstractions' }], storeAs: 'appstractions' } ])
    const appstractions = useSelector( state => state.firestore.data.appstractions);

    const handleClose = (event) => {
        event.stopPropagation();
        history.push('/gallery')
    };

    const leftClick = () => {
        const values = Object.values(appstractions);
        const title = lightbox.index < 1 ? values[lightbox.length-1].title : values[lightbox.index-1].title
        history.push(`/gallery/${title}`) 
    }

    const rightClick = () => {
        const values = Object.values(appstractions);
        const title = lightbox.index > lightbox.length - 2 ? values[0].title : values[lightbox.index+1].title
        history.push(`/gallery/${title}`) 
    }

    //key toggle
    useEffect(()=> {
        const leftKey = () => {
            const values = Object.values(appstractions);
            const title = lightbox.index < 1 ? values[lightbox.length-1].title : values[lightbox.index-1].title
            history.push(`/gallery/${title}`) 
        }
    
        const rightKey = () => {
            const values = Object.values(appstractions);
            const title = lightbox.index > lightbox.length - 2 ? values[0].title : values[lightbox.index+1].title
            history.push(`/gallery/${title}`) 
        }

        const handleKeyDown = (event) => {
            const key = event.key;
            if(key === 'ArrowLeft') return leftKey();
            if(key === 'ArrowRight') return rightKey();
        }

        if(params.title){
            window.addEventListener('keydown',handleKeyDown)
        }
      
        return ()=> window.removeEventListener('keydown', handleKeyDown);
    },[params, appstractions, lightbox, updateLightbox, history])
   

    //set url on params change
    useEffect(()=>{
        if(!appstractions || !params.title) return;
        const values = Object.values(appstractions);
        const index  = values.findIndex(obj => obj.title === params.title);
        updateLightbox({
            url: index > -1 ? values[index].url : null,
            length: values.length,
            index: index
        })
    },[appstractions, params])

   
    return (
        <>
            {lightbox.index === -1 && <Redirect to={PAGE_NOT_FOUND}/>}
            <Fade in={Boolean(params.title && lightbox.index !== null && lightbox.index > -1)}>
                <Box className={classes.container} onClick={handleClose}>
                    <Box overflow='auto' display='flex' padding='16px 0' flexDirection='column'>
                
                    <IconButton onClick={handleClose} className={classes.closeButton} aria-label='close'>
                        <Tooltip title="Close" aria-label="close">
                            <CloseIcon />
                        </Tooltip>
                    </IconButton>         
                    <Box className={classes.dialog} onClick={(e)=>e.stopPropagation()}>   
                        <Box 
                            className={classes.image} 
                            style={{backgroundImage: appstractions && lightbox.url ? `url(${lightbox.url})` : ''}}
                        >
                            <Box className={classes.buttonContainer}>
                                <IconButton onClick={leftClick} className={classes.iconButton} aria-label='left'>
                                    <Tooltip title="Back" aria-label="back">
                                        <ArrowForwardIosIcon  className={classes.backArrow} />
                                    </Tooltip>
                                </IconButton> 
                                <IconButton onClick={rightClick} className={classes.iconButton} aria-label='right'>
                                    <Tooltip title="Forward" aria-label="forward">
                                        <ArrowForwardIosIcon />
                                    </Tooltip>
                                </IconButton> 
                            </Box> 
                        </Box> 
                    </Box>
                    <Typography variant='h6' className={classes.title}>{params.title}</Typography>
                    <Typography className={classes.text}>{lightbox.index + 1} of {lightbox.length}</Typography>
                    </Box>
                </Box>
            </Fade>         
        </>
    );
  }