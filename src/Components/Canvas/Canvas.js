import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import uniqueid from 'lodash.uniqueid';
import Row from './Units/Row'
import CanvasContext from '../../Contexts/CanvasContext'
import '../../Styles/Canvas.scss'
import {toggleRendering, saveCustomPreset}from '../../Actions/Interface/allInterfaceActions'

export default function Canvas(){
    //useSelectors called once from canvas to improve performance; uses context to pass values
    const {quantity,image,shadow, pattern, background,maxUnits,randomValues, swapPattern} = useSelector(state => state.canvas);
    const {createClicked,rerenderClicked,firstRender, animation, preset, rendering} = useSelector(state => state.interface)
    const dispatch = useDispatch(); 
    const [delay, toggleDelay] = useState(false)

    const canvasRef = useRef();
    const [canvasHeight, setCanvasHeight] = useState(); 
    const [canvasWidth, setCanvasWidth] = useState();
    //allows useEffect to call current ref since outside the scope
    const updateCanvasSize = () => {
        setCanvasHeight(canvasRef.current.offsetHeight);
        setCanvasWidth(canvasRef.current.offsetWidth);
    }
    //retrieve new canvas size (determined by container @media) on browser resize
    useEffect(()=> {
        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();
        return ()=> window.removeEventListener('resize', updateCanvasSize)
    },[]);


    //improve page load
    useEffect(()=>{
        dispatch(toggleRendering(true))
        setTimeout(()=>{
            toggleDelay(delay => !delay);
            dispatch(toggleRendering(false));
        },500)
    },[])

    //stop loading spinner animation
    useEffect(()=> {    
        if(rendering)dispatch(toggleRendering(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[randomValues, swapPattern, quantity, shadow, background, pattern])
    //stopp loading spinner; seperated incase custom matches another preset
    useEffect(()=>{
        if(rendering)setTimeout(()=>dispatch(toggleRendering(false)),100)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[preset])
    
    //save custom settings incase presets toggled; also set custom to default on first load
    useEffect(()=>{   
        if(preset === 'custom' || firstRender)dispatch(saveCustomPreset({quantity,shadow, pattern, background}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quantity,shadow, pattern, background])

    //percentage of canvas a single row or block takes up; used to calculate background positions
    const blockRelativeSize = 1/quantity.block * 100
    const rowRelativeSize = 1/quantity.row * 100;
    //dissect background image into grid based on user selected row and block quantity
    //passed directly to child attributes as means of deconstructing 
    const backgroundPositions = Array(maxUnits.row).fill().reduce((rows,x,i)=>{
        rows[i] = Array(maxUnits.block).fill().reduce((blocks,y,j)=>{
            //x and y background position for each visible block within a visible row
            blocks[j] = (j + 1 <= quantity.block && i + 1 <= quantity.row) ? {
                x: j * blockRelativeSize,
                y: i * rowRelativeSize
            } : {
                x: '',
                y: ''
            }
            return blocks; 
        },{}); 
        return rows; 
    },{});

    //construct alternate pattern for stripe direction toggle
    //passed directly to child attributes as means of deconstructing
    const alternatePattern =  Array(maxUnits.row).fill().reduce((rows,x,i)=>{
        rows[i] = Array(maxUnits.block).fill().reduce((blocks,y,j)=>{
            //x and y background position for each visible block within a visible row
            if(maxUnits.block%2 === 0) {
                if(i%2 === 0){
                    blocks[j] = j%2 === 0 ? 'column' : 'row'
                }else{
                    blocks[j] = j%2 === 0 ? 'row' : 'column'
                }
            }else {
                blocks[j] = j%2 === 0 ? 'row' : 'column'
            }
            return blocks; 
        },{}); 
        return rows; 
    },{});

    //generate random indexes to fragmented background based on swap pattern; sent to blocks through context
    let temp; 
    const randomIndexes = Object.values(swapPattern).reduce((indexes, booleans, i) => {
        if(i < quantity.stripe){ 
            booleans.forEach((boolean, j) => {
                if(boolean && j < quantity.stripe - 1) {
                    temp = indexes[j];
                    indexes[j] = indexes[j + 1];
                    indexes[j + 1] = temp;
                }
            })
        }
        return indexes
    }, new Array(quantity.stripe).fill().map((ele, i) => i));
    

    //generate unique id for each row
    const ids = useMemo(()=>new Array(maxUnits.row).fill().map(ele => uniqueid()),[maxUnits.row]);

    const rowComponents = [];
    for(let i = 0; i < quantity.row; i++){
        //each visible row is passed relevant background positions, alternate pattern, and randomValues
        rowComponents.push(
            <Row 
                key={ids[i]} 
                backgroundPositions={backgroundPositions[i]}
                alternatePattern={alternatePattern[i]}
                randomValues={randomValues[i]}
            />
        )
    }

    const backgroundStyle = {
        //animation on render only
        transition: animation? `opacity .5s linear 1.8s` : '',
        opacity: !createClicked ? '0' : '1',
        //user can alter
        backgroundImage: `url(${image})`,
        backgroundSize: !background.stretch ? 
            `${background.detail}%` : `${background.detail}% 100%`
    }

    //context divided by unit
    //rows only render after create appstraction button is clicked
    //static layer exists for animation background 
    return (
        <CanvasContext.Provider value={{
            rowContext: {quantity, maxUnits},
            blockContext: {
                quantity, pattern, background, maxUnits, randomIndexes, firstRender,
                transition: animation && (rerenderClicked || firstRender)? `1.5s linear 0s` : '',
                flexBasis: `calc(100%/${maxUnits.block})`,
                currentUnitSizes: {
                    row: canvasHeight/quantity.row, 
                    block: canvasWidth/quantity.block, 
                    stripe: {row: blockRelativeSize/quantity.stripe, column: rowRelativeSize/quantity.stripe}
                },
            },
            stripeContext:{
                backgroundImage: `url(${image})`,
                opacity: !createClicked ? '0' : '1',
                flexBasis: `calc(100%/${maxUnits.stripe})`,
                borderRadius: background.ellipse ? `${canvasWidth}px` : '',
                boxShadow: `0px ${canvasWidth * shadow.angle}px ${canvasWidth * shadow.size}px ${canvasWidth * .0025}px rgba(0,0,0,${shadow.opacity})`,
                rerenderClicked,
                animation
            },
        }}>
            <div ref={canvasRef} className='canvas'>
                <div className='static' style={{backgroundImage:`url(${image})`}} />
                {delay && <div className='background' style={backgroundStyle} />}
                {delay && rowComponents}
            </div>
        </CanvasContext.Provider>
    )
}
