import React, { useState, useEffect } from 'react'
import {useFirestoreConnect} from 'react-redux-firebase'
import {useSelector} from 'react-redux'
import {useParams, Redirect} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { PAGE_NOT_FOUND } from '../../Routes/routes';
import CanvasSpinner from '../Home/Create/CanvasSpinner/CanvasSpinner'
import {Helmet} from 'react-helmet'

const styles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.background.default,
        display:'flex',
        width:'100%',
        height:'100%',
        overflow:'auto',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    image: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        flexShrink: 0,
        margin: '12px auto',
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
        '@media (max-height: 752px) and (min-width:960px)': {
            width: '750px',
            height: '500px'
        },
    },
}))


export default function View (){
    const classes = styles();
    const params = useParams(); 
    useFirestoreConnect([ { collection: 'users', doc: params.uid, subcollections: [{ collection: 'appstractions' }], storeAs: 'appstractions' } ])
    const appstractions = useSelector( state => state.firestore.data.appstractions);
    const [visible,toggleVisible] = useState(true);

    useEffect(() => {
        if(!appstractions) return;
        toggleVisible(false);
    },[appstractions]);

    return(
        <Box className={classes.container}>
            {visible && <CanvasSpinner/>}
            {typeof appstractions !== 'undefined' && params &&
                <Box overflow='auto' padding='16px 0' display='flex' flexDirection='column'>
                    {appstractions !== null && appstractions[params.title] ?
                        <Box className={classes.image} style={{backgroundImage:`url(${appstractions[params.title].url})`}}>
                            <Helmet>
                                <meta name='image' content='https://images.unsplash.com/photo-1598274560998-f5b91d19d1f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'/>
                                <meta property='og:image' content='https://images.unsplash.com/photo-1598274560998-f5b91d19d1f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'/>

                            </Helmet>
                        </Box>:
                        <Redirect to={PAGE_NOT_FOUND}/>
                    }
                </Box>
            }
        </Box>
    )
}