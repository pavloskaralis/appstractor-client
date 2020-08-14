import React, {useContext} from 'react';
import CanvasContext from '../../../Contexts/CanvasContext'

//takes in relevant background possition and random values, and background size calculated within block
export default function Stripe ({backgroundPosition, backgroundSize, randomValues}) {

    const {stripeContext:{backgroundImage,flexBasis, borderRadius, boxShadow, rerenderClicked, firstRender, animation}} = useContext(CanvasContext);
    
    const stripeStyle = {
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: randomValues.flexGrow,
        //animation on render only
        transition: animation && !firstRender ? `1.5s ease-in 0s`: ``,
        //hides stripe if not visible
        backgroundImage: backgroundImage,
        flexBasis: flexBasis,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
    }

    return <div 
        className='stripe'
        style={stripeStyle}
    ></div>
}