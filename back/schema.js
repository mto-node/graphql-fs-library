const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
  }

  type Book {
    id: ID!
    title: String!
    author: Author
  }

  type Query {
    books: [Book]
    book(id: ID!): Book

    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String, author: String): Book!
    deleteBook(id: ID!): Book!
  }
`;

module.exports = typeDefs;
