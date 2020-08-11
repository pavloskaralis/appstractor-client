import React, { useMemo, useContext } from 'react';
import CanvasContext from '../../../Contexts/CanvasContext'
import uniqueid from 'lodash.uniqueid';
import Block from './Block';

//takes in visibility boolean, relevant background positions (object),
//relevant alternate flex directions (object), and relevant random values
export default function Row({backgroundPositions, alternatePattern, randomValues}){
    //access canvas state
    const {rowContext: {quantity,maxUnits}} = useContext(CanvasContext);
    //generate unique id for each block in row
    const ids = useMemo(()=> new Array(maxUnits.block).fill().map(ele => uniqueid()), [maxUnits.block]);
    
    const blockComponents = []
    
    for(let i = 0; i < quantity.block; i++){
        blockComponents.push(
            <Block 
                key={ids[i]} 
                backgroundPosition={backgroundPositions[i]}
                alternateDirection={alternatePattern[i]}
                randomValues={randomValues[i]}
            />
        )
    }


    return (
        <div 
            className='row'
        >
            {blockComponents}
        </div>
    )
}
