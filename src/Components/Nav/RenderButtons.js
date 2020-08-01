import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles({
    saveButton: {
        marginLeft: 12
    }
})

export default function RenderTools(){
    const classes = styles();

    return (
        <> 
            <ButtonGroup variant='text' size='small' aria-label='text primary button group'>
                <Button>Upload</Button>
                <Button>Link</Button>
                <Button>Search</Button>
            </ButtonGroup>
         
            <Button className={classes.saveButton} size='small' variant='outlined'>Save</Button>
        </>
    )
}


