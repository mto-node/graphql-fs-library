// const { books, authors } = require("./data");
const AuthorController = require("./controllers/AuthorController");
const BookController = require("./controllers/BookController");
const UserController = require("./controllers/UserController");

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => UserController.getUsers(),
    user: (_, { id }) => UserController.getUserById(id),

    books: () => BookController.getBooks(),
    book: (_, { id }) => BookController.getBookById(id),

    authors: () => AuthorController.getAuthors(),
    author: (_, { id }) => AuthorController.getAuthorById(id),
  },

  Mutation: {
    // USER
    addUser: (_, { name, email, password }) =>
      UserController.addUser(name, email, password),

    updateUser: (_, { id, name, email, password }) =>
      UserController.updateUser(id, name, email, password),

    deleteUser: (_, { id }) => UserController.deleteUser(id),

    // BOOK
    addBook: (_, { title, authorId }) =>
      BookController.addBook(title, authorId),

    updateBook: (_, { id, title, author }) =>
      BookController.updateBook(id, title, author),

    deleteBook: (_, { id }) => BookController.deleteBook(id),
  },
};

module.exports = resolvers;
