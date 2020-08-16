import React from 'react'
import { Route,Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import {LOGIN} from '../Routes/routes'


export default function PrivateRoute({ component, path }) {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <>
        {isLoaded(auth) && !isEmpty(auth) ?
            <Route exact path={path} component={component}/> :
            <Redirect to={LOGIN}/>
        }
    </>
  );
}