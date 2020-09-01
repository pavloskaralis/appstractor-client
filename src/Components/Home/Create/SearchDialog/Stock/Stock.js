import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link'
import {useInView} from 'react-intersection-observer';
import Typography  from '@material-ui/core/Typography';
import {useDispatch} from 'react-redux'
import {toggleSearchDialog, toggleCreateClicked, toggleFirstRender} from '../../../../../Actions/Interface/allInterfaceActions'
import setImage from '../../../../../Actions/Canvas/setImage';
import axios from 'axios'
const styles = makeStyles(theme => ({
    card: {
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
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



export default function Stock({urls,name,link, download}) {
    const classes = styles(); 
    const dispatch = useDispatch();

    const [ref, inView] = useInView({
        triggerOnce: true, 
        threshold: 0,
        rootMargin: '0px 0px -15px 0px'
    })

    const handleClick = () => {
        const id = '4229c9ccce8609e45051cea4103298e9a0bc85c2173c8c719dfde18bf2ea0ee2'
        const api = download + '?client_id='
        axios.get(api + id);
        dispatch(toggleCreateClicked(false))
        dispatch(toggleFirstRender(true))
        dispatch(setImage({small: urls.small, medium: urls.medium}))
        setTimeout(()=> {
            dispatch(toggleSearchDialog(false))
        },0)
    }
    return(
        
        <div ref={ref} onClick={handleClick} className={classes.card} style={{opacity: inView ? 1 : 0}} >
            { inView && 
                <>
                    <div className={classes.border}>
                        <div className={classes.linkContainer}>
                            <Link href={link} color='inherit' target='_blank' rel='noopener'>{name}</Link>
                            <Typography className={classes.text} variant='inherit'> | </Typography>
                            <Link href='https://unsplash.com/' target='_blank' rel='noopener' color='inherit'>Unsplash</Link>
                        </div>  
                    </div>
                 
                    <CardMedia
                        className={classes.cardMedia}
                        image={urls.medium.replace(/q=0/,'q=80')}
                        title="Image title"
                    />  
                    
                </>
            }
        </div>

    )
}