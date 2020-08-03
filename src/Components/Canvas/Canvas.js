import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import uniqueid from 'lodash.uniqueid';
import Row from './Row'
import CanvasContext from '../../Contexts/CanvasContext'
import '../../Styles/Canvas.scss'

export default function Canvas(){
    //use ref to get canvas height and width (determined by its container)
    const canvasRef = useRef();
    const [canvasHeight, setCanvasHeight] = useState(); 
    const [canvasWidth, setCanvasWidth] = useState();

    //retrieve new canvas size on browser resize;  better performance than event listener
    useEffect(()=> {
        console.log('canvasRef Change')
        setCanvasHeight(canvasRef.current.offsetHeight);
        setCanvasWidth(canvasRef.current.offsetWidth);
    },[canvasRef])

    //access render state
    const render = useSelector(state => state.render.render)
    //access canvas state
    const {quantity,image,background,maxUnits,randomValues} = useSelector(state => state.canvas);

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

    //generate unique id for each row
    const ids = useMemo(()=>new Array(maxUnits.row).fill().map(ele => uniqueid()),[maxUnits.row]);
    const rowComponents = ids.map((id,i) => {
        //row is visible if its index falls within user set quantity.row
        //each row is passed relevant background positions, alternate pattern, and randomValues
        return <Row 
            key={id} 
            isVisible={i + 1 <= quantity.row}
            backgroundPositions={backgroundPositions[i]}
            alternatePattern={alternatePattern[i]}
            randomValues={randomValues[i]}
        />
    })

    const backgroundStyle = {
        //animation on render only
        transition: `opacity .5s linear 2s`,
        opacity: !render ? '0' : '1',
        //user can alter
        backgroundImage: `url(${image})`,
        backgroundSize: !background.stretch ? 
            `${background.detail}%` : `${background.detail}% 100%`
    }

    //canvasDimensions used by stripes for boxShadow and borderRadius
    //currentUnitSizes used by blocks for backgroundSize and fragmenting background
    //rows only render after create appstraction button is clicked
    return (
        <CanvasContext.Provider value={{
            canvasDimensions: {width: canvasWidth, height: canvasHeight}, 
            currentUnitSizes: {
                row: canvasHeight/quantity.row, 
                block: canvasWidth/quantity.block, 
                stripe: {row: blockRelativeSize/quantity.stripe, column: rowRelativeSize/quantity.stripe}
            },
            render: render
        }}>
            <div ref={canvasRef} className='canvas'>
                <div className='static' style={{backgroundImage:`url(${image})`}} />
                <div className='background' style={backgroundStyle} />
                {rowComponents}
            </div>
        </CanvasContext.Provider>
    )
}
