import { ApolloClient, InMemoryCache } from "@apollo/client";

// Création d'un client Apollo
function createApolloClient() {
  return new ApolloClient({
    uri: "https://graphql-library.onrender.com", // Replace with your actual backend URL
    cache: new InMemoryCache(),
  });
}

export default createApolloClient();

// link: new HttpLink({
//     uri: "https://graphql-library.onrender.com", // Assurez-vous que cela pointe vers votre serveur GraphQL
//   }),
