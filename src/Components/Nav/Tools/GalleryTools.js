import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import GetAppIcon from '@material-ui/icons/GetApp'
import Menu from '@material-ui/core/Menu'
import DateRangeIcon from '@material-ui/icons/DateRange'
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const styles = makeStyles(theme => ({
    iconButton: {
         color: theme.palette.text.primary,
         maxWidth: 46
    }, 
    group: {
        [theme.breakpoints.up('796px')]:{
            marginLeft: theme.spacing(1.5)
        }
    },
    menu:{
        '& .MuiMenuItem-root':{
            [theme.breakpoints.up('796px')]:{
                minWidth: 86.5
            }
        }
    },

    search: {
        margin: theme.spacing(0,.8),
        [theme.breakpoints.up('796px')]:{
            margin: theme.spacing(0,1.5),
        },
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        minWidth: 110,
    },
    searchIcon: {
        padding: theme.spacing(0, 1.5),
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
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
    },
    sortBy: {
        textTransform: 'capitalize',
        minWidth: 32
    },
    selectAll: {
        height: 30
    }
}))

export default function GalleryTools(){
    const classes = styles();
    const matches = useMediaQuery('(min-width:796px)');
    const [direction, toggleDirection] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [anchorEl, setAnchorEl] = useState(null)

    const handleDirectionClick = () => {
        toggleDirection(direction => !direction)
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleSortBySelect = (event) => {
        const id = event.target.id;
        handleClose();
        setSortBy(id);

    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <>
            <ButtonGroup size='small' variant='text' className={classes.group}>
                <Button  className={classes.iconButton} aria-label='order' onClick={handleDirectionClick}>
                    <Tooltip title="Order"  size='small' aria-label="order">
                        {direction ? <ArrowDownwardIcon fontSize='small' /> : <ArrowUpwardIcon fontSize='small' />}
                    </Tooltip>
                </Button> 

                <Button 
                    aria-label='sort-by'
                    endIcon={<ArrowDropDownIcon/>} 
                    onClick={handleMenuClick} 
                    className={matches? '':classes.iconButton} 
                >
                    <Tooltip  title="Sort By" aria-label="sort-by">
                        {matches ? 
                            <Typography variant='button' className={classes.sortBy}>
                                {sortBy}
                            </Typography>:
                            <Box display='flex' justifyContent='center' marginRight='-8px'>
                                {sortBy === 'date' ? <DateRangeIcon  fontSize='small' /> : <SortByAlphaIcon fontSize='small' />}
                            </Box>
                        }
                    </Tooltip>
                </Button>   
            </ButtonGroup>
                

            <Box display='flex' flexDirection='column' justifyContent='center'>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search"
                        classes={{
                            input: classes.input,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Box>

            <Menu 
                anchorEl={anchorEl}
                keepMounted
                open={anchorEl && anchorEl.ariaLabel === 'sort-by'}
                onClose={handleClose}
                className={classes.menu}
            >
                <MenuItem 
                    onClick={handleSortBySelect}
                    id='date' 
                    selected={sortBy==='date'}
                >
                    Date
                </MenuItem>
                <MenuItem 
                    onClick={handleSortBySelect}
                    id='title' 
                    selected={sortBy==='title'}
                >
                    Title
                </MenuItem>

            </Menu>

            <Box margin='0 auto' minWidth={matches ? '224px' : 'initial'} display='flex' justifyContent='space-evenly'>
                {matches ?
                    <Box display='flex' flexDirection='column' justifyContent='center'>
                        <Button size='small'  className={classes.selectAll} variant='outlined'>
                            Select All
                        </Button>
                    </Box>:
                    <IconButton className={classes.iconButton}                      aria-label='select-all'>
                        <Tooltip title="Select All" aria-label="select-all">
                            <SelectAllIcon />
                        </Tooltip>
                    </IconButton> 
                }
                {matches ? 
                    <>
                        <IconButton className={classes.iconButton} aria-label='download'>
                            <Tooltip title="Download" aria-label="download">
                                <GetAppIcon />
                            </Tooltip>
                        </IconButton> 

                        <IconButton className={classes.iconButton} aria-label='delete'>
                            <Tooltip title="Delete" aria-label="delete">
                                <DeleteForeverIcon />
                            </Tooltip>
                        </IconButton> 
                    </> : 
                    <>
                        <IconButton onClick={handleMenuClick} className={classes.iconButton} aria-label='actions'>
                            <Tooltip title="Actions" aria-label="Actions">
                                <MoreVertIcon />
                            </Tooltip>
                        </IconButton> 
                        <Menu 
                            anchorEl={anchorEl}
                            keepMounted
                            open={anchorEl && anchorEl.ariaLabel==='actions'}
                            onClose={handleClose}
                            className={classes.menu}
                        >
                            <MenuItem 
                                id='Download' 
                            >
                                Download
                            </MenuItem>
                            <MenuItem 
                                id='Delete' 
                            >
                                Delete
                            </MenuItem>

                        </Menu>
                    </>
                }
            </Box>
            
            
   
        </>
    )
}


