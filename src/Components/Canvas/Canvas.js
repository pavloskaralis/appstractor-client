import React, { useMemo } from 'react';
import { useSelector } from 'react-redux'
import uniqueid from 'lodash.uniqueid';
import Row from './Row';
import '../../Styles/Canvas.scss'


//passes canvas dimensions, max unit limits, and current unit sizes
const CanvasContext = React.createContext();
export {CanvasContext}

//takes in 2 objects: {canvasHeight, canvasWidth} and {rowMax, blockMax, stripeMax}
export default function Canvas({canvasDimensions, maxUnits}){
    //access canvas state
    const {rowQuanity,blockQuantity,stripeQuantity,imageSource,backgroundCompression,backgroundDetail} = useSelector(state => state.canvas);

    //generate unique id for each row
    const ids = useMemo(()=>new Array(maxUnits.rowMax).fill().map(ele => uniqueid()),[maxUnits.rowMax]);

    //absolute height of block and width; passed to blocks for background compression
    const rowAbsoluteHeight = canvasDimensions.canvasHeight/rowQuanity;
    const blockAbsoluteWidth = canvasDimensions.canvasWidth/blockQuantity;
    //percentage of canvas a single row or block takes up; used to calculate background positions
    const blockRelativeSize = 1/blockQuantity * 100
    const rowRelativeSize = 1/rowQuanity * 100;
    //percentage of block a single stripe takes up depending on flex direction; passed to blocks to fragment background
    const stripeRowSize = blockRelativeSize/stripeQuantity
    const stripeColumnSize = rowRelativeSize/stripeQuantity

    //dissect background image into grid based on user selected row and block quantity
    const backgroundPositions = Array(maxUnits.rowMax).fill().reduce((rows,x,i)=>{
        rows[i] = Array(maxUnits.blockMax).fill().reduce((blocks,y,j)=>{
            //x and y background position for each visible block within a visible row
            blocks[j] = (j + 1 <= blockQuantity && i + 1 <= rowQuanity) ? {
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
    const wovenPattern =  Array(maxUnits.rowMax).fill().reduce((rows,x,i)=>{
        rows[i] = Array(maxUnits.blockMax).fill().reduce((blocks,y,j)=>{
            //x and y background position for each visible block within a visible row
            if(maxUnits.blockMax%2 === 0) {
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
            isVisible={i + 1 <= rowQuanity}
            backgroundPositions={backgroundPositions[i]}
            wovenPattern={wovenPattern[i]}
        />
    })

    const canvasStyle = {
        //user cannot alter
        height: canvasDimensions.canvasHeight,
        width: canvasDimensions.canvasWidth,
        //user can alter
        backgroundImage: `url(${imageSource})`,
        backgroundSize: !backgroundCompression ? `${backgroundDetail}%` : `${backgroundDetail}% ${canvasDimensions.canvasHeight}px `
    }

    return (
        <CanvasContext.Provider value={{
            canvasDimensions, 
            maxUnits, 
            unitSizes: {rowSize: rowAbsoluteHeight, blockSize: blockAbsoluteWidth, stripeSize: {row: stripeRowSize, column: stripeColumnSize}}
        }}>
            <div className='canvas' style={canvasStyle}>
                {rowComponents}
            </div>
        </CanvasContext.Provider>
    )
}
