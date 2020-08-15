import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import interfaceReducer from './interfaceReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export default combineReducers({
    canvas: canvasReducer,
    interface: interfaceReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})