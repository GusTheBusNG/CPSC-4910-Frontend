import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './state/client';

import ExampleGraphQL from './pages/example-graphql';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <ExampleGraphQL />
    </ApolloProvider>
  );
}

export default App;
