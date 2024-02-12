// const { books, authors } = require("../data");
const { Book, Author } = require("../db/Sequelize");

class BookController {
  constructor() {}

  async getBooks() {
    console.log("fetch books");

    // Fetch all books with their associated authors in a single query
    const books = await Book.findAll({
      include: {
        model: Author, // Include the Author model
        attributes: ["name"], // Only fetch the 'name' attribute from Author
      },
    });
    books.map((book) => (book.author = book.Author.dataValues));
    return books;
  }

  async getBookById(id) {
    console.log("getBookById");
    const book = await Book.findByPk(id, { include: Author });
    book.author = book.Author.dataValues;

    // const book = await Book.findByPk(id);
    // if (!book) {
    //   return null; // Handle case where book is not found
    // }

    // const author = await Author.findByPk(book.AuthorId);
    // book.author = author;

    // console.log(book);
    return book;
  }

  async addBook(title, authorId) {
    console.log("addBook");
    try {
      // Find or create the author by name
      // let author = await Author.findOne({ where: { name: authorName } });
      // if (!author) {
      //   // Create the author if not found
      //   author = await Author.create({ name: authorName });
      // }

      // Create the book and associate it with the author
      const book = await Book.create({ title, AuthorId: authorId });

      return book;
    } catch (error) {
      console.error("Error adding book:", error);
      throw error;
    }
  }
}

module.exports = new BookController();
