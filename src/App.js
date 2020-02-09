import React from 'react';
import HeaderBar from './components/headerbar'
import HomePage from './pages/homepage/'
import Login from './pages/login'
import Register from './pages/register'
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './state/client';

import ExampleGraphQL from './pages/example-graphql';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <HeaderBar/>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/register'>
        <Register/>
      </Route>
      <Route exact path='/home'>
        <HomePage/>
      </Route>
      <Route exact path='/'>
        <HomePage/>
      </Route>
    </Router>
  );
}

export default App;
