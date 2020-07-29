import React, { useMemo } from 'react';
import { useSelector } from 'react-redux'
import uniqueid from 'lodash.uniqueid';
import Row from './Row'
import '../../Styles/Canvas.scss'


//passes canvas dimensions, max unit limits, and current unit sizes
const CanvasContext = React.createContext();
export {CanvasContext}

//takes in 2 objects: {canvasHeight, canvasWidth}
export default function Canvas({canvasDimensions}){
    //access canvas state
    const {quantity,image,background,maxUnits,randomValues} = useSelector(state => state.canvas);

    //generate unique id for each row
    const ids = useMemo(()=>new Array(maxUnits.row).fill().map(ele => uniqueid()),[maxUnits.row]);

    //absolute height of block and width; passed to blocks for background compression
    const rowAbsoluteHeight = canvasDimensions.height/quantity.row;
    const blockAbsoluteWidth = canvasDimensions.width/quantity.row;
    //percentage of canvas a single row or block takes up; used to calculate background positions
    const blockRelativeSize = 1/quantity.block * 100
    const rowRelativeSize = 1/quantity.row * 100;
    //percentage of block a single stripe takes up depending on flex direction; passed to blocks to fragment background
    const stripeRowSize = blockRelativeSize/quantity.stripe
    const stripeColumnSize = rowRelativeSize/quantity.stripe

    //dissect background image into grid based on user selected row and block quantity
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

    //construct woven pattern for stripe direction toggle
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

    const rowComponents = ids.map((id,i) => {
        //row is visible if its index falls within user set row quantity
        //each row is passed relevant background positions 
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

    return (
        <CanvasContext.Provider value={{
            canvasDimensions, 
            currentUnitSize: {row: rowAbsoluteHeight, block: blockAbsoluteWidth, stripe: {row: stripeRowSize, column: stripeColumnSize}}
        }}>
            <div className='canvas' style={canvasStyle}>
                {rowComponents}
            </div>
        </CanvasContext.Provider>
    )
}
