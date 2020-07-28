import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'

export default combineReducers({
    firebase: '',
    user: '',
    canvas: canvasReducer
})