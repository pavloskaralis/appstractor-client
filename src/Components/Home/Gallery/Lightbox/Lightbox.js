import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux'
import {useFirestoreConnect} from 'react-redux-firebase'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import {useHistory, useParams} from 'react-router-dom'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Fade from '@material-ui/core/Fade'
import setSnackbar from '../../../../Actions/Interface/setSnackbar'

const styles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(66,66,66,.85)',
        zIndex: 1201
    },
    dialog: {
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
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams(); 
    const [values, setValues] = useState({
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
        const keys = Object.keys(appstractions);
        const key = values.index < 1 ? keys[values.length-1] : keys[values.index-1]
        history.push(`/gallery/${key}`) 
    }

    const rightClick = () => {
        const keys = Object.keys(appstractions);
        const key = values.index > values.length - 2 ? keys[0] : keys[values.index+1]
        history.push(`/gallery/${key}`) 
    }

    //key toggle
    useEffect(()=> {
        const leftKey = () => {
            const keys = Object.keys(appstractions);
            const key = values.index < 1 ? keys[values.length-1] : keys[values.index-1]
            history.push(`/gallery/${key}`) 
        }
    
        const rightKey = () => {
            const keys = Object.keys(appstractions);
            const key = values.index > values.length - 2 ? keys[0] : keys[values.index+1]
            history.push(`/gallery/${key}`) 
        }

        const handleKeyDown = (event) => {
            const key = event.key;
            if(key === 'ArrowLeft') return leftKey();
            if(key === 'ArrowRight') return rightKey();
        }

        if(params.id){
            window.addEventListener('keydown',handleKeyDown)
        }
      
        return ()=> window.removeEventListener('keydown', handleKeyDown);
    },[params, appstractions, values, setValues])
   

    //set url on params change
    useEffect(()=>{
        if(!appstractions) return;
        if(!params.id) return;
        if(params.id && !appstractions[params.id]){
            const imageNotFound = ()=> {
                history.push('/gallery')
                dispatch(setSnackbar({success:false, message: 'Image does not exist.'}))
            }
            return imageNotFound();
        }
        setValues({
            url: appstractions[params.id].url,
            length: Object.keys(appstractions).length,
            index: Object.keys(appstractions).indexOf(params.id)
        })
       },[appstractions, params])

   
    return (
        <Fade in={params.id}>
            <Box className={classes.container} onClick={handleClose}>
                <IconButton onClick={handleClose} className={classes.closeButton} aria-label='close'>
                    <Tooltip title="Close" aria-label="close">
                        <CloseIcon />
                    </Tooltip>
                </IconButton>         
                <Box className={classes.dialog} onClick={(e)=>e.stopPropagation()}>   
                    <Box 
                        className={classes.image} 
                        style={{backgroundImage: appstractions && params.id ? `url(${values.url})` : ''}}
                    >
                        <Box className={classes.buttonContainer}>
                            <IconButton onClick={leftClick} className={classes.iconButton} aria-label='left'>
                                <ArrowForwardIosIcon  className={classes.backArrow} />
                            </IconButton> 
                            <IconButton onClick={rightClick} className={classes.iconButton} aria-label='right'>
                                <ArrowForwardIosIcon />
                            </IconButton> 
                        </Box>
                    </Box>
                </Box>
                <Typography variant='h6' className={classes.title}>{params.id}</Typography>
                <Typography className={classes.text}>{values.index + 1} of {values.length}</Typography>
            </Box>
        </Fade>
    );
  }