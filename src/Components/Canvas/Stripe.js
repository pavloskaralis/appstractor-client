import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import CanvasContext from '../../Contexts/CanvasContext'

//takes in visibility boolean, background position (object {x.y}), background size css string, and relevant random values
export default function Stripe ({isVisible, backgroundPosition, backgroundSize, randomValues}) {
    //access canvas state
    const {image,background,shadow,maxUnits} = useSelector(state => state.canvas);
    //access max limit of stripes per block and canvas width
    const {canvasDimensions, render} = useContext(CanvasContext);

    const stripeStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: randomValues.flexGrow,
        //animation on render only; better performance than keyframes
        transition: `opacity .25s linear ${Math.random() * 1.25}s`,
        opacity: !render ? '0' : '1',
        //hides stripe if not visible
        display: isVisible ? 'flex' : 'none',
        flexBasis: `calc(100%/${maxUnits.stripe})`,
        borderRadius: background.ellipse ? `${canvasDimensions.width}px` : '',
        boxShadow: `0px ${canvasDimensions.width * shadow.angle}px ${canvasDimensions.width * shadow.size}px ${canvasDimensions.width * .0025}px rgba(0,0,0,${shadow.opacity})`
    }

    return <div 
        className='stripe'
        style={stripeStyle}
    ></div>
}