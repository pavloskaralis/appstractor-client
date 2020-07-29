import React, { useState, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {CanvasContext} from './Canvas'

//takes in visibility boolean, background position (object {x.y}), background size css string, and rerender number
export default function Stripe ({isVisible, backgroundPosition, backgroundSize, rerender}) {
    //access canvas state
    const {imageSource,stripeShape,shadowAngle,shadowDiffusion,shadowIntensity} = useSelector(state => state.canvas);
    //access max limit of stripes per block and canvas width
    const {maxUnits:{stripeMax}, canvasDimensions:{canvasWidth}} = useContext(CanvasContext);
    //each stripe has a randomly assigned flex grow value
    const flexGrow = useMemo(()=>[1,6,10][Math.floor(Math.random() * 3)],[rerender]);
    
    const stripeStyle = {
        backgroundImage: `url(${imageSource})`,
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: flexGrow,
        //hides stripe if not visible
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${stripeMax})`,
        borderRadius: stripeShape ? `${canvasWidth}px` : '',
        boxShadow: `0px ${canvasWidth * shadowAngle}px ${canvasWidth * shadowDiffusion}px ${canvasWidth * .0015}px rgba(0,0,0,${shadowIntensity})`
    }

    return <div 
        className='stripe'
        style={stripeStyle}
    ></div>
}