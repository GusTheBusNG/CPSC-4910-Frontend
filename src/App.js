import React from 'react';
import AccountRecovery from './pages/accountrecovery'
import Dashboard from './pages/dashboard'
import HeaderBar from './components/headerbar'
import HomePage from './pages/homepage/'
import Login from './pages/login'
import Register from './pages/register'
import Support from './pages/support'
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './state/client';

// Add this to any route to see how graphql works
// import ExampleGraphQL from './pages/example-graphql';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <HeaderBar/>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/accountrecovery'>
          <AccountRecovery/>
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
        <Route path='/support'>
          <Support/>
        </Route>
        <Route path='/dashboard'>
          <Dashboard/>
        </Route>
        <Route exact path='/'>
          <HomePage/>
        </Route>
      </Router>
    </ApolloProvider>
  );
}

export default App;
