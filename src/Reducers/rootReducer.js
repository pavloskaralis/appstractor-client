import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import interfaceReducer from './interfaceReducer'

export default combineReducers({
    firebase: '',
    user: '',
    canvas: canvasReducer,
    interface: interfaceReducer
})