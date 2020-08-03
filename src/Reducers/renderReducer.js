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

export default function canvasReducer(state = initialState, action){
    switch(action.type){    
        case 'TOGGLE_RENDER':
            return {...state, render: action.payload}
        case 'TOGGLE_RERENDER':
            return {...state, rerender: action.payload}
        case 'TOGGLE_RERENDERING':
            return {...state, rerender: action.payload}
        case 'SET_PRESET':
                return {...state, preset: action.payload}
        case 'SET_CUSTOM_PRESET':
            return {...state, custom: action.payload}
        default:
            return state        
    }
}
