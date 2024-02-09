// const { books, authors } = require("./data");
const BookController = require("./controllers/BookControllers");

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => BookController.getBooks(),
    book: (_, { id }) => BookController.getBookById(id),

    authors: () => authors,
    author: (_, { id }) => authors.find((author) => author.id === id),
  },

  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        id: Date.now().toString(),
        title,
        author,
      };
      books.push(newBook);
      return newBook;
    },

    updateBook: (_, { id, title, author }) => {
      const book = books.find((book) => book.id === id);
      if (!book) {
        throw new Error("Book not found");
      }
      if (title) book.title = title;
      if (author) book.author = author;
      return book;
    },

    deleteBook: (_, { id }) => {
      const index = books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new Error("Book not found");
      }
      const [book] = books.splice(index, 1);
      return book;
    },
  },
};

module.exports = resolvers;
