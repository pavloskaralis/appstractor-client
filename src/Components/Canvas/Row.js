import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import uniqueid from 'lodash.uniqueid';
import Block from './Block';

//takes in visibility boolean, relevant background positions (object),
//relevant woven flex directions (object), and relevant random values
export default function Row({isVisible, backgroundPositions, wovenPattern, randomValues}){
    //access canvas state
    const {quantity,maxUnits} = useSelector(state => state.canvas);
    //generate unique id for each block in row
    const ids = useMemo(()=> new Array(maxUnits.block).fill().map(ele => uniqueid()), [maxUnits.block]);
    
    const blockComponents = ids.map((id,i)=>{
        //block is visible if its index falls within user set block quantity and exists within visible row
        return <Block 
            key={id} 
            isVisible={i + 1 <= quantity.block && isVisible} 
            backgroundPosition={backgroundPositions[i]}
            wovenDirection={wovenPattern[i]}
            randomValues={randomValues[i]}
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
