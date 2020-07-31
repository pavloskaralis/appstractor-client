import React, { useMemo } from 'react';
import { useSelector } from 'react-redux'
import uniqueid from 'lodash.uniqueid';
import Row from './Row'
import CanvasContext from '../../Contexts/CanvasContext'
import '../../Styles/Canvas.scss'




//takes in object {height, width} to allow for dynamic/responsive sizing 
export default function Canvas({canvasDimensions}){
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

    //percentage of block a single stripe takes up depending on flex direction
    //passed to blocks through CanvasContext to fragment background
    const stripeRowSize = blockRelativeSize/quantity.stripe
    const stripeColumnSize = rowRelativeSize/quantity.stripe
    //absolute height of block and width
    //passed to blocks through CanvasContext for background.stretch
    const rowAbsoluteHeight = canvasDimensions.height/quantity.row;
    const blockAbsoluteWidth = canvasDimensions.width/quantity.row;

    //construct woven pattern for stripe direction toggle
    //passed directly to child attributes as means of deconstructing
    const wovenPattern =  Array(maxUnits.row).fill().reduce((rows,x,i)=>{
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
        //each row is passed relevant background positions, woven pattern, and randomValues
        return <Row 
            key={id} 
            isVisible={i + 1 <= quantity.row}
            backgroundPositions={backgroundPositions[i]}
            wovenPattern={wovenPattern[i]}
            randomValues={randomValues[i]}
        />
    })

    const canvasStyle = {
        //user cannot alter
        height: canvasDimensions.height,
        width: canvasDimensions.width,
        //user can alter
        backgroundImage: `url(${image})`,
        backgroundSize: !background.stretch ? `${background.detail}%` : `${background.detail}% ${canvasDimensions.height}px `
    }

    //canvasDimensions used by stripes for boxShadow and borderRadius
    //currentUnitSizes used by blocks for backgroundSize and fragmenting background
    return (
        <CanvasContext.Provider value={{
            canvasDimensions, 
            currentUnitSizes: {row: rowAbsoluteHeight, block: blockAbsoluteWidth, stripe: {row: stripeRowSize, column: stripeColumnSize}}
        }}>
            <div className='canvas' style={canvasStyle}>
                {rowComponents}
            </div>
        </CanvasContext.Provider>
    )
}
