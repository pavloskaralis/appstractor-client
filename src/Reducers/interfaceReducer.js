const initialState = {
    //enables animation
    animation: true, 
    //changes animation effect
    firstRender: true, 
    //allows animation during rerender only
    rerenderClicked: false,
    //enables visibility
    createClicked: false, 
    //loading status
    rendering: false,
    //tracks user preset
    preset: 'default',
    //stores custom preset
    customPreset: null,
    //global snackbar
    snackbar: null
}

//all properties which relate to the render interface, but not required to replicate a canvas
export default function canvasReducer(state = initialState, action){
    switch(action.type){ 
        //reset canvas on log in to whipe demo use
        case 'RESET_INTERFACE': 
            return {...state, firstRender: true, createClicked: false, preset: 'default', customPreset: null}
        //allow animations
        case 'TOGGLE_ANIMATION':
            return {...state, animation: action.payload}
        //toggled 1.5 seconds after first create button click
        case 'TOGGLE_FIRST_RENDER': 
            return {...state, firstRender: action.payload}
        //toggled on first rerender when create is clicked
        case 'TOGGLE_CREATE_CLICKED':
            return {...state, createClicked: action.payload}
        //toggled on subsequent renders when create is clicked 
        case 'TOGGLE_RERENDER_CLICKED':
            return {...state, rerenderClicked: action.payload}
        //toggled by any editing action
        //currently not in use; adds to the delay 
        //which is already not long enough to warrent a spinner
        case 'TOGGLE_RENDERING':
            return {...state, rendering: action.payload}
        //presets select value 
        case 'SET_PRESET':
                return {...state, preset: action.payload}
        //toggled by any editing action; saves custom preset
        case 'SAVE_CUSTOM_PRESET':
            return {...state, customPreset: action.payload}
        //initiates snackbar message
        case 'SET_SNACKBAR':
            return {...state, snackbar: action.payload}
        default:
            return state        
    }
}
