import React from 'react'
import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    saveButton: {
        marginLeft: 24
    }
});

export default function RenderTools(){
    const classes = useStyles();

    return (
        <> 
            <ButtonGroup variant='text' size='small' aria-label='text primary button group'>
                <Button>Upload</Button>
                <Button>Link</Button>
                <Button>Search</Button>
            </ButtonGroup>
            <ButtonGroup className={classes.saveButton} size='small'>
                <Button>Save</Button>
            </ButtonGroup>
        </>
    )
}


