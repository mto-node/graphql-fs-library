const { books, authors } = require("./data");

const resolvers = {
  Query: {
    books: () => books,
    // books: () => module.books.getBooks(),
    book: (_, { id }) => books.find((book) => book.id === id),

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
