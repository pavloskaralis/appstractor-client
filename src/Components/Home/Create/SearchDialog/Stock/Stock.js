import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link'
import {useInView} from 'react-intersection-observer';
import Typography  from '@material-ui/core/Typography';
import {useDispatch} from 'react-redux'
import {toggleSearchDialog, toggleCreateClicked, toggleFirstRender} from '../../../../../Actions/Interface/allInterfaceActions'
import setImage from '../../../../../Actions/Canvas/setImage';

const styles = makeStyles(theme => ({
    card: {
        minHeight: 180,
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
        [theme.breakpoints.up(887)]:{
            width: 'calc(50% - 16px)', 
            maxWidth: 'calc(50% - 16px)', 
        },
        [theme.breakpoints.up(1247)]:{
            width: 'calc(33.33% - 16px)',
            maxWidth: 'calc(33.33% - 16px)', 
        },
        transition:'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;', 

    },

    cardMedia: {
        paddingTop: '66.66%', 
    },
  
    border:{
        borderRadius: 4,
        transition:'border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', 
        position:'absolute',
        height:'100%',
        width:'100%',
        border: 'solid 2px transparent',
        color: 'transparent',
        '&:hover':{
            border:'solid 2px #2196f3',
            color: theme.palette.text.primary,
        }
    },

    linkContainer: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        padding: theme.spacing(.5)
    },
    text: {
        margin: theme.spacing(0, .5)
    }


}))



export default function Stock({url,name,link}) {
    const classes = styles(); 
    const dispatch = useDispatch();

    const [ref, inView] = useInView({
        triggerOnce: true, 
        threshold: 0,
        rootMargin: '0px 0px -15px 0px'
    })

    const handleClick = () => {
        dispatch(toggleCreateClicked(false))
        dispatch(toggleFirstRender(true))
        dispatch(setImage(url))
        setTimeout(()=> {
            dispatch(toggleSearchDialog(false))
        },0)
    }
    return(
        
        <Box ref={ref} onClick={handleClick} className={classes.card} style={{opacity: inView ? 1 : 0}} >
            { inView && 
                <>
                    <Box className={classes.border}>
                        <Box className={classes.linkContainer}>
                            <Link href={link} color='inherit' target='_blank' rel='noopener'>{name}</Link>
                            <Typography className={classes.text} variant='link'> | </Typography>
                            <Link href='https://unsplash.com/' target='_blank' rel='noopener' color='inherit'>Unsplash</Link>
                        </Box>  
                    </Box>
                 
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