import React, { useState, useEffect, useRef } from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import Photo from './Photo/Photo'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BottomNavagation from '@material-ui/core/BottomNavigation'
import SearchBar from '../../Nav/Tools/SubTools/SearchBar'
import ScrollPosContext from '../../../Contexts/ScrollPosContext'

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
        justifyContent:'space-between',
        flexGrow: 1, 
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
    const [scrollPos, setScrollPos] = useState(0); 
    const ref = useRef();

    const updateScrollPos = () => {
        setScrollPos(ref.current.scrollTop)
    }

    //retrieve new scroll pos
    useEffect(()=> {
        let scrolling = false; 
        const toggleScrolling = () => {
            scrolling = true;
        } 
        ref.current.addEventListener('scroll', toggleScrolling)
        //throttling
        setInterval(() => {
            if (scrolling) {
                scrolling = false
                updateScrollPos();
            }
        },300);
        return ()=> ref.current.removeEventListener('scroll', toggleScrolling)
    },[]);

   
    return (
        <Box 
            id='hometabpanel-1'
            aria-labelledby='hometab-1'
            className={classes.box} 
            ref={ref}
        >

            <Box className={classes.photoContainer}>
                <ScrollPosContext.Provider value={scrollPos}>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>            
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                    <Photo/>
                </ScrollPosContext.Provider>
            </Box>


            {matches && 
                <BottomNavagation > 
                    <SearchBar/>
                </BottomNavagation>
            }
        </Box>
    );
}
