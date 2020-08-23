import React, {useState,useEffect} from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Photo from './Photo/Photo'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BottomNavagation from '@material-ui/core/BottomNavigation'
import SearchBar from '../../Nav/Tools/SubTools/SearchBar'
import {useFirestoreConnect, isEmpty} from 'react-redux-firebase'
import {useSelector, useDispatch} from 'react-redux'
import {setSnackbar, updateSelected} from '../../../Actions/Interface/allInterfaceActions'
import CanvasSpinner from '../Create/CanvasSpinner/CanvasSpinner'

const styles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.background.default,
        display:'flex',
        width:'100%',
        height:'100%',
        overflow:'auto',
        flexDirection: 'column'
    },
    photoContainer: {
        display:'flex',
        flexWrap:'wrap',
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(3, 1),
        overflow:'auto',
        [theme.breakpoints.up('sm')]:{
            maxWidth: 600,
            overflow: 'initial'
        },
        [theme.breakpoints.up('md')]:{
            maxWidth: 960
        }
    },
}))

export default function Create() {
    const classes = styles();
    const matches = useMediaQuery('(max-width:599px)');
    const [delay, toggleDelay] = useState(false)
    const dispatch = useDispatch();
    //load appstractions
    const uid = useSelector(state => state.firebase.auth.uid);
    useFirestoreConnect([ { collection: 'users', doc: uid, subcollections: [{ collection: 'appstractions' }], storeAs: 'appstractions' } ])
    const appstractions = useSelector( state => state.firestore.data.appstractions);
    //spinner state
    const [visible, toggleVisible] = useState(true);

    //faster page load delaying images
    useEffect(()=> {
        setTimeout(()=> {
            //stop spinner
            toggleVisible(false);
            toggleDelay(delay=>!delay)
        },500)
        //deselect all on unmount
        return () =>  dispatch(updateSelected([]));
    },[])

    useEffect(()=>{
        //wait for firestore connection
        if(typeof appstractions === 'undefined') return;
        //if no images alert empty state; sync with spinner stop 
        if(isEmpty(appstractions)) setTimeout(()=>dispatch(setSnackbar({success:false, message: 'You have not created any images.'})),500)
    },[appstractions])

    //notifies photos to deselect if selected
    const deselectAll = (event) => {
        event.stopPropagation(); 
        dispatch(updateSelected([]));
    }


    return (
        <Box 
            id='hometabpanel-1'
            aria-labelledby='hometab-1'
            className={classes.box}
            onClick={deselectAll} 
        >
            {visible && <CanvasSpinner/>}
            <Box className={classes.photoContainer}>
                {delay && appstractions &&  
                   Object.values(appstractions).map((image, i) => {
                       return (
                           <Photo url={image.url} title={image.title} key={image.title} />
                       )
                   })
                }
            </Box>

            <Box flexGrow={1}/>
            {matches && 
                <BottomNavagation > 
                    <SearchBar/>
                </BottomNavagation>
            }
        </Box>
    );
}
