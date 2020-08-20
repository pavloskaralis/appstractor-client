import React from 'react'
import {useDispatch } from 'react-redux'
import {toggleLinkDialog, toggleSearchDialog} from '../../../../Actions/Interface/allInterfaceActions'
import {useSelector} from 'react-redux'
import { ClickAwayListener } from '@material-ui/core';



export default function ClickAwayWrap({children, type}){
    const dispatch = useDispatch();
    const {linkDialog, searchDialog} = useSelector(state => state.interface);
 

    const handleLinkClose = () => {
        dispatch(toggleLinkDialog(false))
    };


    const handleSearchClose = () => {
        dispatch(toggleSearchDialog(false))
    };

  
    return (
        <>
            {(type === 'search' && searchDialog)||(type === 'link' && linkDialog) ?
                <ClickAwayListener 
                    onClickAway={type === 'search' ? handleSearchClose : handleLinkClose}
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                >
                    {children}
                </ClickAwayListener>:
                children
            }
        </>   
    );
         
  
}