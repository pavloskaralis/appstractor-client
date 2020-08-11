import React, { useMemo, useContext } from 'react';
import CanvasContext from '../../../Contexts/CanvasContext'
import uniqueid from 'lodash.uniqueid';
import Stripe from './Stripe'

//takes in  relevant background position (object {x,y}), alternate flex direction string, and relevant random values
export default function Block({backgroundPosition, alternateDirection,randomValues}){
    //access canvas state
    const {blockContext: {quantity, pattern, background, maxUnits, currentUnitSizes, flexBasis, randomIndexes, transition}} = useContext(CanvasContext);
    //generate unique id for each stripe in block
    const ids = useMemo(()=> new Array(maxUnits.stripe).fill().map(ele => uniqueid()),[maxUnits.stripe]);
    
    //cannot be calculated at higher level given direction can be random
    const flexDirection = {
        random: randomValues.flexDirection,
        horizontal: 'column',
        vertical: 'row',
        alternate: alternateDirection
    }[pattern]
    
    //calculate fragmented background positions; dependant on flex direction 
    const fragmentedBackgroundPositions = new Array(quantity.stripe).fill().map((ele,i)=>{
  
        //return stripe background positions based on flex direction
        return flexDirection === 'column' ? {
            x: backgroundPosition.x,
            y: backgroundPosition.y + (i * currentUnitSizes.stripe.column)
        } : {
            x: backgroundPosition.x + (i * currentUnitSizes.stripe.row),
            y: backgroundPosition.y
        }
    
    })

    //background size dependant on flex direction of block
    //calculated here rather than stripe for faster performance
    const backgroundSize = !background.stretch ? `${background.detail}%` : flexDirection === 'column' ? `
        ${background.detail}% ${currentUnitSizes.row}px` : `${currentUnitSizes.block}px ${background.detail}%`
    
    const stripeComponents = [];
    for(let i = 0; i < quantity.stripe; i++){
        //each visible stripe is passed a random fragmented background position 
        stripeComponents.push(
            <Stripe  
                key={ids[i]} 
                backgroundPosition={fragmentedBackgroundPositions[randomIndexes[i]]}
                backgroundSize={backgroundSize}
                randomValues={randomValues.stripes[i]}
            />
        )
    }

    const blockStyle = {
        //toggles between random and uniform flexGrow 
        flexGrow: background.uniform ? 1 : randomValues.flexGrow,
        flexDirection: flexDirection,
        flexBasis: flexBasis,
        transition: transition  
    }

    return (
        <div 
            className='block' 
            style={blockStyle}
        >
            {stripeComponents}
        </div>
    )
}
