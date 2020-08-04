const initialState = {
    //enables visibility
    render: false, 
    //enables full rerender of loaded image
    rerender: false,
    //loading status
    rendering: false,
    //tracks user preset
    preset: 'default',
    //stores custom preset
    customPresent: null
}

//all properties which relate to the render interface, but not required to replicate a canvas
export default function canvasReducer(state = initialState, action){
    switch(action.type){   
        //toggled when an image is uploaded, linked, or selected
        case 'TOGGLE_RENDER':
            return {...state, render: action.payload}
        //toggled by rerender switch; allows full rerender of image
        case 'TOGGLE_RERENDER':
            return {...state, rerender: action.payload}
        //toggled by any editing action
        case 'TOGGLE_RENDERING':
            return {...state, rendering: action.payload}
        //presets select value 
        case 'SET_PRESET':
                return {...state, preset: action.payload}
        //toggled by any editing action; saves custom preset
        case 'SET_CUSTOM_PRESET':
            return {...state, custom: action.payload}
        default:
            return state        
    }
}
