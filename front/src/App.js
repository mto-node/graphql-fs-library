import React from "react";
import { Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import NavBar from "./components/NavBar/NavBar";
import { createApolloClient } from "./apolloClient";

const client = createApolloClient();

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
