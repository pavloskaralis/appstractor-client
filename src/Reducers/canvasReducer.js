import createRandomValues from '../Functions/createRandomValues'
import defaultPreset from '../Presets/defaultPreset'

const maxUnits = {
    row: 12, 
    block: 18, 
    stripe: 24
}

const initialState = {
    ...defaultPreset, 
    image: 'https://cdn.pixabay.com/photo/2016/11/29/12/16/buildings-1869425_1280.jpg', 
    randomValues: createRandomValues(defaultPreset.quantity, maxUnits),
    maxUnits: maxUnits
}

console.log(initialState)
//initial state merges blank canvas with default preset
export default function canvasReducer(state = initialState, action){
    switch(action.type){
        case 'LOAD_PRESET' :
            return {...state, ...action.payload}
        case 'RENDER_APPSTRACTION':
            return {...state, randomValues: createRandomValues(state.quantity, state.maxUnits)}
        case 'SET_IMAGE':
            return {...state, image: action.payload}
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
