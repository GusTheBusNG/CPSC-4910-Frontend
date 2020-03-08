import React from 'react';
import AccountRecovery from './pages/accountrecovery'
import Dashboard from './pages/dashboard'
import HeaderBar from './components/headerbar'
import HomePage from './pages/homepage/'
import Login from './pages/login'
import Profile from './pages/profile'
import Register from './pages/register'
import Support from './pages/support'
import Catalog from './pages/catalog';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './state/client';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <HeaderBar/>
        <Route path='/login'            component={Login} />
        <Route path='/accountrecovery'  component={AccountRecovery} />
        <Route path='/register'         component={Register} />
        <Route path='/support'          component={Support} />
        <Route path='/dashboard'        component={Dashboard} />
        <Route path='/catalog'          component={Catalog} />
        <Route path='/profile'          component={Profile} />
        <Route exact path='/'           component={HomePage} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
