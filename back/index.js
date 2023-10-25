const { ApolloServer, gql } = require('apollo-server');

const books = [
  { id: '1', title: '1984', author: 'George Orwell' },
  { id: '2', title: 'Brave New World', author: 'Aldous Huxley' }
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String, author: String): Book!
    deleteBook(id: ID!): Book!
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id)
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        id: Date.now().toString(),
        title,
        author
      };
      books.push(newBook);
      return newBook;
    },
    updateBook: (_, { id, title, author }) => {
      const book = books.find(book => book.id === id);
      if (!book) {
        throw new Error('Book not found');
      }
      if (title) book.title = title;
      if (author) book.author = author;
      return book;
    },
    deleteBook: (_, { id }) => {
      const index = books.findIndex(book => book.id === id);
      if (index === -1) {
        throw new Error('Book not found');
      }
      const [book] = books.splice(index, 1);
      return book;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  try {
    const { url } = await server.listen();
    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
