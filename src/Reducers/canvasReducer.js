import createRandomValues from '../Functions/createRandomValues'
import defaultPreset from '../Presets/defaultPreset'
import createSwapPattern from '../Functions/createSwapPattern'

const maxUnits = {
    row: 12, 
    block: 18, 
    stripe: 24
}
//aerial neon cityscape sky graffiti texture experimental
const initialState = {
    ...defaultPreset, 
    image: '',
    randomValues: createRandomValues(maxUnits),
    swapPattern: createSwapPattern(maxUnits.stripe),
    maxUnits: maxUnits
}

//initial state merges blank canvas with default preset
//all properties required to replicate a canvas
export default function canvasReducer(state = initialState, action){
    switch(action.type){
        //reset canvas on log in to whipe demo use
        case 'RESET_CANVAS': {
            return {...state, image: '', ...defaultPreset}
        }
        //triggered by preset selection
        case 'LOAD_PRESET' :
            return {...state, ...action.payload}
        //triggered by create button
        case 'RENDER_APPSTRACTION':
            return {...state, swapPattern: createSwapPattern(maxUnits.stripe), randomValues: createRandomValues(state.maxUnits) }
        //triggered by upload, link, or stock search
        case 'SET_IMAGE':
            return {...state, image: action.payload}
        //all below triggered by render drawer controls
        case 'SET_ROW_QUANTITY':
            return {...state, quantity: {...state.quantity, row: action.payload}}
        case 'SET_BLOCK_QUANTITY':
            return {...state, quantity: {...state.quantity, block: action.payload}}
        case 'SET_STRIPE_QUANTITY':
            return {...state, quantity: {...state.quantity, stripe: action.payload}}
        case 'SET_PATTERN':
            return {...state, pattern: action.payload}
        case 'SET_BACKGROUND_DETAIL':
            return {...state, background: {...state.background, detail: action.payload}}
        case 'TOGGLE_BACKGROUND_ELLIPSE':
            return {...state, background: {...state.background, ellipse: action.payload}}
        case 'TOGGLE_BACKGROUND_STRETCH':
            return {...state, background: {...state.background, stretch: action.payload}}
        case 'TOGGLE_BACKGROUND_UNIFORM':
            return {...state, background: {...state.background, uniform: action.payload}}
        case 'SET_SHADOW_OPACITY':
            return {...state, shadow: {...state.shadow, opacity: action.payload} }
        case 'SET_SHADOW_ANGLE':
            return {...state, shadow: {...state.shadow, angle: action.payload}}
        case 'SET_SHADOW_SIZE':
            return {...state, shadow: {...state.shadow, size: action.payload}}
        default:
            return state        
    }
}
