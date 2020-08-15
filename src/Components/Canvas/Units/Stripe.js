import React, {useContext} from 'react';
import CanvasContext from '../../../Contexts/CanvasContext'

//takes in relevant background possition and random values, and background size calculated within block
export default function Stripe ({backgroundPosition, backgroundSize, randomValues}) {

    const {stripeContext:{backgroundImage,flexBasis, borderRadius, boxShadow, rerenderClicked, firstRender, animation}} = useContext(CanvasContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const stripeStyle = {
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        flexGrow: randomValues.flexGrow,
        //animation on render only
        transition: animation  ? `all 1.5s ease-in 0s, box-shadow .75s`: ``,
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