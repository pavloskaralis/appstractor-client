import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {CanvasContext} from './Canvas';
import uniqueid from 'lodash.uniqueid';
import Block from './Block';

//takes in visibility boolean, relevant background positions (object), and relevant woven flex directions (object)
export default function Row({isVisible, backgroundPositions, wovenPattern}){
    //access canvas state
    const {blockQuantity} = useSelector(state => state.canvas);
    //access max limit of blocks per row 
    const {maxUnits:{blockMax}} = useContext(CanvasContext)
    //generate unique id for each block in row
    const ids = useMemo(()=> new Array(blockMax).fill().map(ele => uniqueid()), [blockMax]);

    const blockComponents = ids.map((id,i)=>{
        //block is visible if its index falls within user set block quantity and exists within visible row
        return <Block 
            key={id} 
            isVisible={i + 1 <= blockQuantity && isVisible} 
            backgroundPosition={backgroundPositions[i]}
            wovenDirection={wovenPattern[i]}
        />
    });

    const rowStyle = {
        //hides block if not visible
        display: isVisible ? 'flex' : 'none'
    }

    return (
        <div 
            className='row'
            style={rowStyle}
        >
            {blockComponents}
        </div>
    )
}
