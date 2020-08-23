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
    snackbar: null,
    //make uploading and saving progress visible
    loading: false, 
    //uploading and saving progress
    progress: 0,
    //makes link dialog visible
    linkDialog: false,
    //makes search dialog visible
    searchDialog: false,
    //makes save dialog visible
    saveDialog: false,
    //makes delete dialog visible
    deleteDialog: false,
    //initiates canvas capture; true value holds title string
    capture: null,
    //contains array of selected titles 
    selected: [],
    //search bar string
    search: ''
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
        case 'SET_PROGRESS':
            return {...state, progress: action.payload}
        case 'TOGGLE_LOADING': 
            return {...state, loading: action.payload}
        case 'TOGGLE_LINK_DIALOG':
            return {...state, linkDialog: action.payload}
        case 'TOGGLE_SEARCH_DIALOG':
            return {...state, searchDialog: action.payload}
        case 'TOGGLE_SAVE_DIALOG':
            return {...state, saveDialog: action.payload}
        case 'TOGGLE_DELETE_DIALOG':
            return {...state, deleteDialog: action.payload}
        case 'TOGGLE_CAPTURE':
            return {...state, capture: action.payload}
        case 'UPDATE_SELECTED':
            return {...state, selected: action.payload}
        case 'UPDATE_SEARCH': 
            return {...state, search: action.payload}
        default:
            return state        
    }
}
