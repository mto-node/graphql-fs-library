import React from "react";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import NavBar from "./components/NavBar/NavBar";

// Création d'un client Apollo
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-library.onrender.com", // Assurez-vous que cela pointe vers votre serveur GraphQL
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar />
        <h1>Library Management</h1>
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
