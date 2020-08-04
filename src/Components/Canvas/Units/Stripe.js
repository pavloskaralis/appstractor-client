import React, {useContext} from 'react';
import CanvasContext from '../../../Contexts/CanvasContext'

//takes in relevant background possition and random values, and background size calculated within block
export default function Stripe ({backgroundPosition, backgroundSize, randomValues}) {

    const {stripeContext:{backgroundImage, opacity, flexBasis, borderRadius, boxShadow}} = useContext(CanvasContext);

    const stripeStyle = {
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: randomValues.flexGrow,
        //animation on render only; better performance
        transition: `opacity .25s linear ${Math.random() * 1.25}s`,
        //hides stripe if not visible
        backgroundImage: backgroundImage,
        opacity: opacity,
        flexBasis: flexBasis,
        borderRadius: borderRadius,
        boxShadow: boxShadow
    }

    return <div 
        className='stripe'
        style={stripeStyle}
    ></div>
}