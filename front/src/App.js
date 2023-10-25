import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import BookList from './BookList';

// Création d'un client Apollo
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000', // Assurez-vous que cela pointe vers votre serveur GraphQL
  }),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Library Management</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
