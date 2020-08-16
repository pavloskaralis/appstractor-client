import React from 'react';
import Box from '@material-ui/core/Box'
import Nav from './Components/Nav/Nav'
import {makeStyles} from '@material-ui/core/styles'
import * as ROUTES from './Routes/routes'
import {Route, Redirect, Switch} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Create from './Components/Home/Create/Create'
import Gallery from './Components/Home/Gallery/Gallery'
import Email from './Components/Account/Email/Email'
import Password from './Components/Account/Password/Password'
import Delete from './Components/Account/Delete/Delete'
import Demo from './Components/Demo/Demo'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Recover from './Components/Recover/Recover'
import Feedback from './Components/Feedback/Feedback'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import PrivateRoute from './Firebase/PrivateRoute'
import AuthIsLoaded from './Firebase/AuthIsLoaded'
import PublicRoute from './Firebase/PublicRoute'
import {useSelector} from 'react-redux'
import {isEmpty} from 'react-redux-firebase'

const styles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
        width: 8,
        backgroundColor: theme.palette.background.darkDefault,
    },
    '*::-webkit-scrollbar-track': {
        boxshadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        borderRadius: '10px',

    },
    '*::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
        opacity: 1,
        backgroundColor: theme.palette.secondary.dark,
        border: `1px solid ${theme.palette.background.darkDefault}`
    },
  },
}))

function App() {
  styles();
  const auth = useSelector(state => state.firebase.auth)
  
  return (
    <Box height='100vh' display='flex' flexDirection='column' >
      <AuthIsLoaded>
        <Nav/>
          <Switch>        
            <Route exact path={ROUTES.HOME} component={isEmpty(auth) ? Landing: Create}/>             
            <Route exact path={ROUTES.PAGE_NOT_FOUND} component={PageNotFound}/>

            <PrivateRoute path={ROUTES.CREATE} component={Create}/>
            <PrivateRoute path={ROUTES.GALLERY} component={Gallery}/>
            <PrivateRoute path={ROUTES.FEEDBACK} component={Feedback}/>
            <PrivateRoute path={ROUTES.ACCOUNT_PASSWORD} component={Password}/>
            <PrivateRoute path={ROUTES.ACCOUNT_DELETE} component={Delete}/>
            <PrivateRoute path={[ROUTES.ACCOUNT, ROUTES.ACCOUNT_EMAIL]} component={Email}/>
            
            
            <PublicRoute exact path={ROUTES.DEMO} component={Demo}/>
            <PublicRoute exact path={ROUTES.SIGNUP} component={Signup}/>
            <PublicRoute exact path={ROUTES.LOGIN} component={Login}/>
            <PublicRoute exact path={ROUTES.RECOVER} component={Recover}/>

            <Redirect from='*' to={ROUTES.PAGE_NOT_FOUND}/> 
          </Switch>
      </AuthIsLoaded>
    </Box>
  );
}

export default App;
