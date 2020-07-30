import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import {CanvasContext} from './Canvas'
import uniqueid from 'lodash.uniqueid';
import Stripe from './Stripe'

//takes in visibility boolean, relevant background position (object {x,y}), woven flex direction string, and relevant random values
export default function Block({isVisible, backgroundPosition, wovenDirection,randomValues}){
    //access canvas state
    const {quantity, pattern, background, maxUnits} = useSelector(state => state.canvas);
    //accesss unit sizes and max limit of stripes per block and blocks per row
    const {currentUnitSize} = useContext(CanvasContext);
    //generate unique id for each stripe in block
    const ids = useMemo(()=> new Array(maxUnits.stripe).fill().map(ele => uniqueid()),[maxUnits.stripe]);
    
    const flexDirection = {
        random: randomValues.flexDirection,
        horizontal: 'column',
        vertical: 'row',
        woven: wovenDirection
    }[pattern]
    
    //calculate fragmented background positions
    const fragmentedBackgroundPositions = new Array(ids.length).fill().map((ele,i)=>{
        //if block and stripe are visible
        if(isVisible && i + 1 <= quantity.stripe) {
            //return stripe background positions based on flex direction
            return flexDirection === 'column' ? {
                x: backgroundPosition.x,
                y: backgroundPosition.y + (i * currentUnitSize.stripe.column)
            } : {
                x: backgroundPosition.x + (i * currentUnitSize.stripe.row),
                y: backgroundPosition.y
            }
        }
        //otherwise return empty positions
        return {x:'',y:''}      
    })

    //background size dependant on flex direction of block; calculated here rather than stripe for faster performance
    const backgroundSize = !background.stretch ? `${background.detail}%` : flexDirection === 'column' ? `
        ${background.detail}% ${currentUnitSize.row}px` : `${currentUnitSize.block}px ${background.detail}%`
    
    let stripeComponents = ids.map((id,i)=>{
        //stripe is visible if its index falls within user set stripe quantity
        //each stripe is passed a random fragmented background position 
        return <Stripe  
            key={id} 
            isVisible={isVisible && i + 1 <= quantity.stripe} 
            backgroundPosition={fragmentedBackgroundPositions[randomValues.indexes[i]]}
            backgroundSize={backgroundSize}
            randomValues={randomValues.stripes[i]}
            // rerender={rerender}
        />
    })

    const blockStyle = {
        //toggles between random and uniform flexGrow 
        flexGrow: background.uniform ? 1 : randomValues.flexGrow,
        flexDirection: flexDirection,
        //hides block if not visible
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${maxUnits.block})`
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
