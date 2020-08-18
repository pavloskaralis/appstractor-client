import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//router dom
import {BrowserRouter} from 'react-router-dom'
//redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './Reducers/rootReducer.js'
//firebase
import fbConfig from './Firebase/fbConfig'
import rrfConfig from './Firebase/rrfConfig'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
//material ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Themes/theme'
import CssBaseline from '@material-ui/core/CssBaseline';

import * as serviceWorker from './serviceWorker';

const loggerMiddleware = createLogger()

firebase.initializeApp(fbConfig);
firebase.firestore();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware.withExtraArgument(getFirebase))
)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}
  
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ReactReduxFirebaseProvider> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
