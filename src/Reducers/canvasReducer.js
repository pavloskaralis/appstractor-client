import defaultCanvas from '../Functions/defaultCanvas'
import shuffleArray from '../Functions/shuffleArray'

export default function canvasReducer(state = defaultCanvas, action){
    switch(action.type){
        case 'LOAD_APPSTRACTION' :
            return action.state
        case 'RERENDER_APPSTRACTION':
            //incomplete
            return state
        case 'RERENDER_BLOCK': {
            return {
                ...state, randomValues: {
                    ...state.randomValues, [action.row]: {
                        ...state.randomValues[action.row],[action.block]: {
                            ...state.randomValues[action.row][action.block],
                            flexDirection: ['row','column'][Math.floor(Math.random() * 2)],
                            indexes: shuffleArray(new Array(state.maxUnits.stripe).fill().map((ele,i) => i),state.quantity.stripe),
                            stripes: new Array(state.maxUnits.stripe).fill().reduce((stripes,z,k)=> {
                                stripes[k] = {
                                    flexGrow: [1,3,5][Math.floor(Math.random() * 3)],
                                }
                                return stripes
                            },{})
                        }
                    }
                }
            }
        }
        case 'SET_IMAGE':
            return {...state, image: action.source}
        case 'SET_ROW_QUANTITY':
            return {...state, quantity: {...state.quantity, row: action.quantity}}
        case 'SET_BLOCK_QUANTITY':
            return {...state, quantity: {...state.quantity, block: action.quantity}}
        case 'SET_STRIPE_QUANTITY':
            return {...state, quantity: {...state.quantity, stripe: action.quantity}}
        case 'SET_PATTERN':
            return {...state, pattern: action.pattern}
        case 'SET_BACKGROUND_DETAIL':
            return {...state, background: {...state.background, detail: action.percentage}}
        case 'TOGGLE_BACKGROUND_ELLIPSE':
            return {...state, background: {...state.background, ellipse: action.boolean}}
        case 'TOGGLE_BACKGROUND_STRETCH':
            return {...state, background: {...state.background, stretch: action.boolean}}
        case 'TOGGLE_BACKGROUND_UNIFORM':
            return {...state, background: {...state.background, stretch: action.boolean}}
        case 'SET_SHADOW_OPACITY':
            return {...state, shadow: {...state.shadow, opacity: action.percentage}}
        case 'SET_SHADOW_ANGLE':
            return {...state, shadow: {...state.shadow, angle: action.quantity}}
        case 'SET_SHADOW_SIZE':
            return {...state, shadow: {...state.shadow, size: action.quantity}}
        default:
            return state        
    }
}
