const { ApolloServer } = require("apollo-server");
// const sequelize = require("./models/Sequelize");
// require("dotenv").config(); // Load environment variables from .env file
const typeDefs = require("./schema");
const resolvers = require("./resolver");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
const startServer = async () => {
  try {
    const { url } = await server.listen();
    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

// import { startStandaloneServer } from '@apollo/server/standalone';
// prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });
