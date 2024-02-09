const { gql } = require("apollo-server");
// const { books, authors } = require("./data");

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
