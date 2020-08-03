import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import renderReducer from './renderReducer'

export default combineReducers({
    firebase: '',
    user: '',
    canvas: canvasReducer,
    render: renderReducer
})