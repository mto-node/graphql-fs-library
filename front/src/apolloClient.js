import { ApolloClient, InMemoryCache } from "@apollo/client";

function createApolloClient() {
  return new ApolloClient({
    uri: "https://graphql-library.onrender.com", // Replace with your actual backend URL
    cache: new InMemoryCache(),
  });
}

export default createApolloClient();
