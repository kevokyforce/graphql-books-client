import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import BookReader from './BookReader';
import './App.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <h1>Book Reader</h1>
        <BookReader />
      </div>
    </ApolloProvider>
  );
};

export default App;
