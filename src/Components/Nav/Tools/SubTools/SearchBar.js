import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Box from '@material-ui/core/Box'
import {useSelector, useDispatch} from 'react-redux'
import {updateSearch, updateSelected} from '../../../../Actions/Interface/allInterfaceActions'

const styles = makeStyles(theme => ({

    container: {
        display:'flex',
        flexGrow:1,  
        maxWidth:'296px', 
        flexDirection:'column', 
        justifyContent:'center',
        [theme.breakpoints.up('sm')]:{
            maxWidth:'218px', 

        },
    },
    search: {
        margin: 0,
        [theme.breakpoints.up('sm')]:{
            margin: theme.spacing(0,1.5),
        },
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        maxHeight: 30,
        minWidth: 114
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary
    },

    input: {
        padding: theme.spacing(.75, 1, .75, 0),
        color: theme.palette.text.primary,
        paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
        transition: theme.transitions.create('width'),
    },

}))

export default function SearchBar(){
    const classes = styles();
    const dispatch = useDispatch();
    const search = useSelector(state => state.interface.search);

    const handleChange = (event) => {
        dispatch(updateSearch(event.target.value));
    }

    const deselectAll = () => {
        dispatch(updateSelected([]));
    }
    return (
        <Box className={classes.container} onClick={deselectAll}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search..."
                    classes={{
                        input: classes.input,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={handleChange}
                />
            </div>
        </Box> 
    )
}


