import React, {useContext, useMemo} from 'react';
import CanvasContext from '../../../Contexts/CanvasContext'

//takes in relevant background possition and random values, and background size calculated within block
export default function Stripe ({backgroundPosition, backgroundSize, randomValues}) {

    const {stripeContext:{backgroundImage, opacity, flexBasis, borderRadius, boxShadow, rerenderClicked}} = useContext(CanvasContext);
    

    const stripeStyle = {
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: randomValues.flexGrow,
        //animation on render only
        transition: rerenderClicked ? `background-position 1.5s ease-in-out 0s`: `opacity .125s ease-out ${Math.random() * 1.5}s`,
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