import React, { useState } from 'react'
import {useDispatch } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import {toggleSearchDialog, toggleCreateClicked, toggleFirstRender} from '../../../../Actions/Interface/allInterfaceActions'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import isImageUrl from 'is-image-url'
import setImage from '../../../../Actions/Canvas/setImage';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import Pagination from '@material-ui/lab/Pagination'

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
        flexDirection: 'column'
    },
    iconButton: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: 15,
        left: 12,
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
           backgroundColor: theme.palette.secondary.main
        }
    },
    appBar: {
        backgroundColor: 'transparent'
    },
    stock:{
        flexGrow: 1,
        overflow: 'auto'
    },
    bottomNav: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    pagination: {
        margin: '0 auto'
    }
}))

export default function SearchDialog(){
    const classes = styles(); 
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleClose = () => {
       dispatch(toggleSearchDialog(false))
    };
  

    const handleSubmit = async (event) =>{
        event.preventDefault();
        // const {link} = values; 
        // setErrors({        
        //     link: '',
        // }); 
        // if(!isImageUrl(link)) {
        //     return setErrors(errors => ({...errors, link:'Not a valid image url.'}))
        // }
        // dispatch(toggleCreateClicked(false))
        // dispatch(toggleFirstRender(true))
        // dispatch(setImage(link))
        // //delay to stop animation
        // setTimeout(()=> {
        //     dispatch(toggleSearchDialog(false))  
        // },0)
    }

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box className={classes.container}>
                <AppBar position="static" className={classes.appBar}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        aria-label="stock-categories"
                        className={classes.tabs}
                        scrollButtons="on"
                    >
                        <Tab label="Aerial" {...a11yProps(0)} />
                        <Tab label="Cityscape" {...a11yProps(1)} />
                        <Tab label="Experimental" {...a11yProps(2)} />
                        <Tab label="Graffiti" {...a11yProps(3)} />
                        <Tab label="Neon" {...a11yProps(4)} />
                        <Tab label="Space" {...a11yProps(5)} />
                        <Tab label="Texture" {...a11yProps(6)} />
                        <Tab label="Wildlife" {...a11yProps(7)} />

                    </Tabs>
                </AppBar>       

                <Box className={classes.stock}>

                </Box>

                <BottomNavigation className={classes.bottomNav}>
                    <Pagination color='secondary' count={10} shape="rounded"  className={classes.pagination}/>
                </BottomNavigation>
                <IconButton onClick={handleClose} size='small' className={classes.iconButton} aria-label='close'>
                    <Tooltip title="Close" aria-label="close">
                        <CloseIcon fontSize='small'/>
                    </Tooltip>
                </IconButton>  
            </Box>           
        </ClickAwayListener>
    );
         
  
}