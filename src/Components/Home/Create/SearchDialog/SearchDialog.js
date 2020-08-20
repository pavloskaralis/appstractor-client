import React, { useState, useEffect, useRef } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import {toggleSearchDialog} from '../../../../Actions/Interface/allInterfaceActions'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Pagination from '@material-ui/lab/Pagination'
import Grow from '@material-ui/core/Grow'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { useFirestoreConnect, useFirestore, isEmpty } from 'react-redux-firebase'
import CanvasSpinner from '../CanvasSpinner/CanvasSpinner'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Stock from './Stock/Stock'

function a11yProps(index) {
    return {
      id: `stock-category-${index}`,
      'aria-controls': `stock-images`,
    };
}

const styles = makeStyles(theme => ({
    container: {
        position:'absolute', 
        zIndex:1, 
        height:'100%', 
        width:'100%', 
        top:'0',
        backgroundColor: theme.palette.background.darkDefault,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
    },
    closeButton: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: 15,
        left: 12,
        zIndex: 1201, 
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
        flexGrow: 1, 
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(3, 1),
        overflow:'auto',
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
    const stock = useSelector( state => state.firestore.data.stock);
    //condition for Grow
    const searchDialog = useSelector(state => state.interface.searchDialog);
    //loading spinner
    const [visible, toggleVisible] = useState(true)
    //stock photo objects derived from stock based on category and page
    const [photos, setPhotos] = useState([]);
    //track Grow so ClickAway doesn't interfere
    const [open, toggleOpen] = useState(false);
    //triggers cache check and conditional api request for stock 
    const [category, setCategory] = useState(categories[0]);
    //current tab value
    const [tab, setTab] = useState(0);
    //current page value
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
        toggleVisible(true);
        setTimeout(()=>{
            setPage(value);
            setPhotos(stock[category].data[value]);
            ref.current.scrollTop = 0; 
        },0)
    } 

    //close search
    const handleClose = () => {
        if(open){
            toggleOpen(false)
            dispatch(toggleSearchDialog(false))
        } else {
            toggleOpen(true)
        }
    };

    const handleTabChange = (event, newTab) => {
        //useEffect triggered by category change
        setCategory(categories[newTab]);
        setTab(newTab);
    };

    //remove spinner
    useEffect(()=> {
        if(photos.length) toggleVisible(false);
    },[photos])

    useEffect(()=> {
        if(isEmpty(stock)) return; 

        //retrieve 300 photos from unsplash
        const getStock = async() => {
            const data = {};
            const id = '4229c9ccce8609e45051cea4103298e9a0bc85c2173c8c719dfde18bf2ea0ee2'
            const api = 'https://api.unsplash.com/search/photos?client_id='
            //max 30 return limit
            for(let i = 1; i <= 10; i ++) {
                const params = '&page=' + i + '&per_page=30&orientation=landscape&query=' 
                const query = api + id + params + category;
                const {data:{results}} = await axios.get(query);
                const reduced = results.reduce((output, obj) => {
                    const newObj = {
                        id: obj.id, 
                        url: obj.urls.regular,
                        name: obj.user.name,
                        link: obj.user.links.html
                    }
                    output.push(newObj);
                    return output;
                },[])
                data[i] = reduced; 
            }

            firestore.collection('stock').doc(category).set({
                data: data,
                date: new Date().toString()
            });
        }

        //check if unsplash request has already been made within 24hours
        const checkDate = async () => {
            if(!stock[category]) return getStock(); 
            const categoryDate = stock[category].date;
            const today = new Date();
            const diffTime = today - new Date(categoryDate); 
            const diffDays = (diffTime / 86400000).toFixed(2);
            //if over 24 hours, initiate request, otherwise use cache 
            if(diffDays > 1) {
                await getStock();
            } else {
                toggleVisible(true);
                setTimeout(()=> {
                    setPage(1)
                    setPhotos(stock[category].data[1]);
                    ref.current.scrollTop = 0; 
                },0)
            }
        }
        
        checkDate();
    },[category, stock])

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Grow in={searchDialog}>
                <Box className={classes.container}>
                    <AppBar position="static" className={classes.appBar}>
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            variant={matchesA ? 'scrollable' : ''}
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
                                    <Stock name={photo.name} url={photo.url} link={photo.link} key={photo.id}/>
                                )
                            })}
                        </Box>
                    </Box>
                    

                    <Box className={classes.bottomNav}>
                        <Pagination size={matchesB ? 'small' : ''} color='secondary' onChange={handlePageChange} count={10} page={page}  shape="rounded"  className={classes.pagination}/>
                    </Box>

                    <IconButton onClick={handleClose} size='small' className={classes.closeButton} aria-label='close'>
                        <Tooltip title="Close" aria-label="close">
                            <CloseIcon fontSize='small'/>
                        </Tooltip>
                    </IconButton>  
                </Box> 
            </Grow>          
        </ClickAwayListener>
    );
         
  
}