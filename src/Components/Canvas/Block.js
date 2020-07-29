import React, { useState, useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import {CanvasContext} from './Canvas'
import uniqueid from 'lodash.uniqueid';
import Stripe from './Stripe'

//stripe indexes get shuffled to fragement background image
const shuffleArray = (array, stripeQuantity) => {    
    let currentIndex = stripeQuantity, temporaryValue, randomIndex;   
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }  
    return array;
}

//takes in visibility boolean, relevant background position (object {x,y}), and woven flex direction string
export default function Block({isVisible, backgroundPosition, wovenDirection}){
    //access canvas state
    const {stripeQuantity,stripeDirection,backgroundCompression,backgroundDetail,blockUniformity,blockQuantity} = useSelector(state => state.canvas);
    //accesss unit sizes and max limit of stripes per block and blocks per row
    const {unitSizes:{stripeSize, rowSize, blockSize}, maxUnits:{stripeMax,blockMax}} = useContext(CanvasContext);
    //generate unique id for each stripe in block
    const ids = useMemo(()=> new Array(stripeMax).fill().map(ele => uniqueid()),[stripeMax]);
    //each stripe retrieves a background position using the index of another stripe in order to fragment background
    const [randomIndexes,resetRandomIndexes] = useState(()=>shuffleArray(new Array(stripeMax).fill().map((ele,i) => i),stripeQuantity));
    //each block has a randomly assigned flex direction that can be toggled
    const [randomDirection, resetRandomDirection] = useState(['row','column'][Math.floor(Math.random() * 2)]);
    //each block has a randomly assigned flex grow value
    const [flexGrow] = useState([1,3,5][Math.floor(Math.random() * 3)]); 
    //rerender serial to signle new flex grow within child stripes
    const [rerender,dispatchRerender] = useState(Math.random());

    const flexDirection = {
        default: randomDirection,
        horizontal: 'column',
        vertical: 'row',
        woven: wovenDirection
    }[stripeDirection]
    
    //calculate fragmented background positions
    const fragmentedBackgroundPositions = new Array(ids.length).fill().map((ele,i)=>{
        //if block and stripe are visible
        if(isVisible && i + 1 <= stripeQuantity) {
            //return stripe background positions based on flex direction
            return flexDirection === 'column' ? {
                x: backgroundPosition.x,
                y: backgroundPosition.y + (i * stripeSize.column)
            } : {
                x: backgroundPosition.x + (i * stripeSize.row),
                y: backgroundPosition.y
            }
        }
        //otherwise return empty positions
        return {x:'',y:''}      
    })

    //background size dependant on flex direction of block; calculated here rather than stripe for faster performance
    const backgroundSize = !backgroundCompression ? `${backgroundDetail}%` : flexDirection === 'column' ? `
        ${backgroundDetail}% ${rowSize}px` : `${blockSize}px ${backgroundDetail}%`
    
    let stripeComponents = ids.map((id,i)=>{
        //stripe is visible if its index falls within user set stripe quantity
        //each stripe is passed a random fragmented background position 
        return <Stripe  
            key={id} 
            isVisible={isVisible && i + 1 <= stripeQuantity} 
            backgroundPosition={fragmentedBackgroundPositions[randomIndexes[i]]}
            backgroundSize={backgroundSize}
            rerender={rerender}
        />
    })

     
    //rerender stripes on click
    const rerenderStripes = () => {
        resetRandomDirection(['row','column'][Math.floor(Math.random() * 2)]);
        resetRandomIndexes(shuffleArray(new Array(stripeMax).fill().map((ele,i) => i),stripeQuantity));
        dispatchRerender(Math.random());
    }

    const blockStyle = {
        //toggles between random and uniform flexGrow 
        flexGrow: blockUniformity ? 1 : flexGrow,
        flexDirection: flexDirection,
        //hides block if not visible
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${blockMax})`
    }

    console.log(blockStyle.flexGrow)
    return (
        <div 
            className='block' 
            style={blockStyle}
            onClick={rerenderStripes}
        >
            {stripeComponents}
        </div>
    )
}
