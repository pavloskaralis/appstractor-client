import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
    group:{
        marginLeft: theme.spacing(1.5),  
        '& .MuiButtonGroup-groupedTextHorizontal:not(:last-child)':{
            border: 'none'
        }
    },
}))



export default function ImageSelect(){
    const classes = styles(); 
    return (
        <ButtonGroup className={classes.group} variant='text' size='small' aria-label='text primary button group'>
            <Button>Upload</Button>
            <Button>Link</Button>
            <Button>Search</Button>      
        </ButtonGroup>
    )
}


