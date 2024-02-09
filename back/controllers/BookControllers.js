const { books, authors } = require("../data");

class BookController {
  constructor() {}

  getBooks() {
    console.log("fetch books");
    return books.map((book) => {
      const author = authors.find((author) => author.id == book.author);
      return { ...book, author };
    });
  }

  getBookById(id) {
    return books.find((book) => {
      if (book.id === id) {
        const author = authors.find((author) => author.id == book.author);
        book.author = author;
        return book;
      }
    });
  }
}

module.exports = new BookController();
