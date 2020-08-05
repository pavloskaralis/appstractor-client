import createRandomValues from '../Functions/createRandomValues'
import defaultPreset from '../Presets/defaultPreset'
import createSwapPattern from '../Functions/createSwapPattern'

const maxUnits = {
    row: 12, 
    block: 18, 
    stripe: 24
}
//10.9 1.6 1.4; 7.4 1.2 .9; 5.4 1 .7

const initialState = {
    ...defaultPreset, 
    image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    // image: 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg', 
    randomValues: createRandomValues(maxUnits),
    swapPattern: createSwapPattern(maxUnits.stripe),
    maxUnits: maxUnits
}

//initial state merges blank canvas with default preset
//all properties required to replicate a canvas
export default function canvasReducer(state = initialState, action){
    switch(action.type){
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
