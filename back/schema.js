const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
  }

  type Book {
    id: ID!
    title: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book

    authors: [Book]
    author(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String, author: String): Book!
    deleteBook(id: ID!): Book!
  }
`;

module.exports = typeDefs;
// author: Author
