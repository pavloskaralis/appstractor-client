import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = makeStyles(theme => ({
    saveButton: {
        marginLeft: 12
    },
    iconButton: {
         color: theme.palette.text.primary,
    }, 
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        width: 'auto',
       
    },
    searchIcon: {
        padding: theme.spacing(0, 1.5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
     inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
}))

export default function GalleryTools(){
    const classes = styles();
    const matches = useMediaQuery('(min-width:512px)');

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <> 
            {matches ? 
                <>
                    <Box>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Box>
                    <Box width='100%' margin='0 12px' justifyContent='center' background='blue'>
                        test2
                    </Box>
                </> :
                <>
                   
                </>
            }
            
   
        </>
    )
}


