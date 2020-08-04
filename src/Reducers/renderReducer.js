const initialState = {
    //enables visibility
    createClicked: false, 
    //changes animation effect
    firstRender: true, 
    //allows animation during rerender only
    rerenderClicked: false,
    //enables full rerender of loaded image
    allowRerender: false,
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
        //toggled after first create button click
        case 'TOGGLE_FIRST_RENDER': 
            return {...state, firstRender: action.payload}
        //toggled when an image is uploaded, linked, or selected
        case 'TOGGLE_CREATE_CLICKED':
            return {...state, createClicked: action.payload}
        case 'TOGGLE_RERENDER_CLICKED':
            return {...state, rerenderClicked: action.payload}
        //toggled by rerender switch; allows full rerender of image
        case 'TOGGLE_ALLOW_RERENDER':
            return {...state, allowRerender: action.payload}
        //toggled by any editing action
        //currently not in use; adds to the delay 
        //which is already not long enough to warrent a spinner
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
