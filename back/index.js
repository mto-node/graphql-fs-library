const { ApolloServer } = require("apollo-server");
// const { books, authors } = require("./data");
const typeDefs = require("./schema");
const resolvers = require("./resolver");

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  try {
    const { url } = await server.listen();
    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
