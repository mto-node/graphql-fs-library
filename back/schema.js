const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

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
    users: [User]
    user(id: ID!): User

    books: [Book]
    book(id: ID!): Book

    authors: [Author]
    author(id: ID!): Author
  }

  #MUTATION
  type Mutation {
    addUser(name: String!, email: String!, password: String!): User!
    updateUser(
      id: String!
      name: String!
      email: String!
      password: String!
    ): User!
    deleteUser(id: String!): User!

    addBook(title: String!, authorId: ID!): Book!
    updateBook(id: ID!, title: String, authorId: ID!): Book!
    deleteBook(id: ID!): Book!
  }
`;

module.exports = typeDefs;
