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
        <Route exact path={ROUTES.PAGE_NOT_FOUND} component={PageNotFound}/>

        <Route exact path={ROUTES.CREATE} component={Create}/>
        <Route exact path={ROUTES.GALLERY} component={Gallery}/>
        <Route exact path={ROUTES.FEEDBACK} component={Feedback}/>
        <Route exact path={[ROUTES.ACCOUNT, ROUTES.ACCOUNT_EMAIL]} component={Email}/>
        <Route exact path={ROUTES.ACCOUNT_PASSWORD} component={Password}/>
        <Route exact path={ROUTES.ACCOUNT_DELETE} component={Delete}/>
        
        <Route exact path={ROUTES.DEMO} component={Demo}/>
        <Route exact path={ROUTES.SIGNUP} component={Signup}/>
        <Route exact path={ROUTES.LOGIN} component={Login}/>
        <Route exact path={ROUTES.RECOVER} component={Recover}/>

        <Redirect from='*' to={ROUTES.PAGE_NOT_FOUND}/> 
      </Switch>
      
    </Box>
  );
}

export default App;
