import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import {toggleSearchDialog} from '../../../../Actions/Interface/allInterfaceActions'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Pagination from '@material-ui/lab/Pagination'
import Slide from '@material-ui/core/Slide'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { useFirestoreConnect, useFirestore, isEmpty } from 'react-redux-firebase'
import CanvasSpinner from '../CanvasSpinner/CanvasSpinner'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Stock from './Stock/Stock'
import Toolbar from '@material-ui/core/Toolbar';

function a11yProps(index) {
    return {
      id: `stock-category-${index}`,
      'aria-controls': `stock-images`,
    };
}

const styles = makeStyles(theme => ({
    container: {
        position:'absolute', 
        zIndex:1200, 
        height:'100%', 
        width:'100%', 
        top:'0',
        backgroundColor: theme.palette.background.darkDefault,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        transition: 'all 423ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    closeButton: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: 71,
        left: 12,
        zIndex: 1203, 
        '@media (min-width: 600px)': {
            top: 19,
        }
    },
    tabs: {
        paddingLeft: 50,
        '& .MuiTab-root': {
            backgroundColor: 'transparent',
            minWidth: 120,
            width: 160,
            '@media (min-width: 600px)': {
                minWidth: 120,
                width: 160,
            }
        },
        '& .MuiTabs-indicator':{
           backgroundColor: theme.palette.secondary.main,
           minWidth: 120,
        }
    },
    appBar: {
        backgroundColor: 'transparent'
    },
    stock:{
        overflow: 'auto',
        display:'flex',
        flexWrap:'wrap',
        flexSlide: 1, 
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(3, 1),
        [theme.breakpoints.up(887)]:{
            maxWidth: 600,
            overflow: 'initial'
        },
        [theme.breakpoints.up(1247)]:{
            maxWidth: 960
        }
    },
    bottomNav: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        minHeight: 56,
        boxShadow: `0px -2px 4px -1px rgba(0,0,0,0.1), 0px -4px 5px 0px rgba(0,0,0,0.07), 0px -1px 10px 0px rgba(0,0,0,0.06);`,
        zIndex: 1
    },
    pagination: {
        margin: '0 auto',
        '& .MuiPaginationItem-page:hover': {
            backgroundColor: theme.palette.background.default,
        },
    },
    
}));

const categories = [
    'Aerial',
    'Cityscape',
    'Experimental',
    'Graffiti',
    'Neon',
    'Space',
    'Texture',
    'Wildlife'
]

export default function SearchDialog(){
    const classes = styles(); 
    const ref = useRef();
    const matchesA = useMediaQuery('(max-width:1372px)');
    const matchesB = useMediaQuery('(max-width: 599px)');
    const dispatch = useDispatch();
    const firestore = useFirestore();
    useFirestoreConnect('stock') ;
    //connects to cache of stock on server
    const stock = useSelector( state => state.firestore.data.stock);
    //condition for Slide
    const searchDialog = useSelector(state => state.interface.searchDialog);
    //loading spinner
    const [visible, toggleVisible] = useState(true)
    //stock photo objects derived from stock based on category and page
    const [photos, setPhotos] = useState([]);
    //triggers cache check and conditional api request for stock 
    const [category, setCategory] = useState(categories[0]);
    //current tab value
    const [tab, setTab] = useState(0);
    //current page value
    const [page, setPage] = useState(1);
    //catch unsplash api error
    const [error,toggleError] = useState(false);

    //on pagination change
    const handlePageChange = (event, value) => {
        //toggle spinner; reset scroll; set new page value; set new photos
        if(value !== page)toggleVisible(true);
        setTimeout(()=>{
            ref.current.scrollTop = 0; 
            setPage(value);
            setPhotos(stock[category].data[value]);
        },0)
    } 

    //close search
    const handleClose = () => {
        //return prevents clickway from dispatching 
        if(!searchDialog) return;
        dispatch(toggleSearchDialog(false))
    };

    const handleTabChange = (event, newTab) => {
        //useEffect triggered by category change
        setCategory(categories[newTab]);
        setTab(newTab);
    };

    //set scroll to top on close/open
    useLayoutEffect(()=> {
        if(ref.current.scrollTop > 0) ref.current.scrollTop = 0; 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchDialog])

    //remove spinner
    useEffect(()=> {
        if(photos.length) toggleVisible(false);
    },[photos]);

    useEffect(()=> {
        //wait for firestore to load 
        if(isEmpty(stock)) return; 

        //retrieve 300 photos from unsplash for specific category
        const getStock = async() => {
            const data = {};
            const id = '4229c9ccce8609e45051cea4103298e9a0bc85c2173c8c719dfde18bf2ea0ee2'
            const api = 'https://api.unsplash.com/search/photos?client_id='
            //max 30 return limit
            try {
                // console.log('try')
                for(let i = 1; i <= 10; i ++) {
                    const params = '&page=' + i + '&per_page=30&orientation=landscape&query=' 
                    const query = api + id + params + (category !== 'Wildlife' ? category : 'Wild Animals');
                    const {data:{results}} = await axios.get(query);
                    // console.log("result",results)
                    const reduced = results.reduce((output, obj) => {
                        const newObj = {
                            id: obj.id, 
                            small: obj.urls.small.replace(/(q=80)/,'q=0'),
                            medium: obj.urls.regular.replace(/(q=80)/,'q=0'),
                            name: obj.user.name,
                            link: obj.links.html,
                            download: obj.links.download_location
                        }
                        output.push(newObj);
                        return output;
                    },[])
                    //format photos for pagination
                    data[i] = reduced; 
                    // console.log('loop')
                }
                //store retrieved photos in fire store to retrigger useEffect
                firestore.collection('stock').doc(category).set({
                    data: data,
                    date: new Date().toString()
                });
            } catch (e) {
                // console.log('error', e)
                return toggleError(true);
            }
        }

        //check if unsplash request has already been made within 24hours
        const checkDate = async () => {
            //if no stock exists for category, get stock
            if(!stock[category] && !error) return getStock(); 
            const categoryDate = stock[category].date;
            const today = new Date();
            const diffTime = today - new Date(categoryDate); 
            const diffDays = (diffTime / 86400000).toFixed(2);
            //if stock over 24 hours old, initiate request, otherwise use cache 
            if(diffDays > 1 && !error) {
                // console.log('if')
                toggleVisible(true);
                //retriggger useEffect
                await getStock();
            } else {
                // console.log('else', diffDays)
                toggleVisible(true);
                ref.current.scrollTop = 0; 
                setPage(1)
                setPhotos(stock[category].data[1]);
            }
        }
        checkDate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[category, stock])

    return (
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClose}
        >
            <Slide in={searchDialog}>
                <Box className={classes.container}>
                    {matchesB && <Toolbar/>}
                    <AppBar position="static" className={classes.appBar}>
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            variant={matchesA ? 'scrollable' : 'standard'}
                            aria-label="stock-categories"
                            className={classes.tabs}
                            scrollButtons="on"
                            centered={matchesA ? false : true}
                        >
                            {categories.map((category, i) =>  {
                                return <Tab key={category} label={category} {...a11yProps(i)} />
                            })}                            
                        </Tabs>
                    </AppBar>    

                    <Box ref={ref} overflow='auto' height='100%'>
                        {visible && <CanvasSpinner/>}
                        <Box className={classes.stock}>
                            {photos.map((photo,i)=>{
                                return(
                                    <Stock name={photo.name} urls={{small: photo.small, medium: photo.medium}} link={photo.link} key={photo.id} download={photo.download}/>
                                )
                            })}
                        </Box>
                    </Box>
                    

                    <Box className={classes.bottomNav}>
                        <Pagination size={matchesB ? 'small' : 'medium'} color='secondary' onChange={handlePageChange} count={10} page={page}  shape="rounded"  className={classes.pagination}/>
                    </Box>

                    <IconButton onClick={handleClose} size='small' className={classes.closeButton} aria-label='close'>
                        <CloseIcon fontSize='small'/>
                    </IconButton>  
                </Box> 
            </Slide>          
        </ClickAwayListener>
    );
         
}

