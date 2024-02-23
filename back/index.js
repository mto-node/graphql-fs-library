const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
const sequelize = require("./db/Sequelize");
require("dotenv").config();
const port = process.env.APP_PORT || 4000;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });
console.log("server: ", server);

// Passing an ApolloServer instance to the `startStandaloneServer` function:
const startServer = async () => {
  try {
    const { url } = await server.listen(port);
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
