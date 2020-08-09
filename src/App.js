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
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import PasswordForget from './Components/PasswordForget/PasswordForget'
import Feedback from './Components/Feedback/Feedback'
import NotFound from './Components/NotFound/NotFound'

const styles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
        width: '6px',
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
    },
  },
}))

function App() {
  styles(); 


  return (
    <Box height='100vh' display='flex' flexDirection='column' >
      <Nav/>
      <Switch>
        <Route exact path={ROUTES.HOME} component={false ? Create : Landing}/>
        <Route exact path={ROUTES.SIGNUP}>
          {false ? <Redirect to={ROUTES.HOME}/> : <Signup/>}
        </Route>
        <Route exact path={ROUTES.LOGIN}>
          {false ? <Redirect to={ROUTES.HOME}/> : <Login/>}
        </Route>
        <Route exact path={ROUTES.PASSWORD_FORGET}>
          {false ? <Redirect to={ROUTES.HOME}/> : <PasswordForget/>}
        </Route>
        <Route exact path={ROUTES.CREATE} component={Create}/>
        <Route exact path={ROUTES.GALLERY} component={Gallery}/>
        <Route exact path={ROUTES.FEEDBACK} component={Feedback}/>
        <Route exact path={[ROUTES.ACCOUNT, ROUTES.ACCOUNT_EMAIL]} component={Email}/>
        <Route exact path={ ROUTES.ACCOUNT_PASSWORD} component={Password}/>
        <Route exact path={ ROUTES.ACCOUNT_DELETE} component={Delete}/>
        <Route component={NotFound}/>
      </Switch>
      
    </Box>
  );
}

export default App;
