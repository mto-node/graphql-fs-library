// const { books, authors } = require("../data");
const { Book, Author } = require("../db/Sequelize");

class BookController {
  constructor() {
    // this.Book = sequelize.models.Book; // Reference model directly
    // this.Author = sequelize.models.Auther; // Reference model directly
  }

  async getBooks() {
    console.log("fetch books");

    // Fetch all books with their associated authors in a single query
    const books = await Book.findAll({
      include: {
        model: Author, // Include the Author model
        attributes: ["name"], // Only fetch the 'name' attribute from Author
      },
    });

    // console.log("books", books[0].Author.name);
    // const books = await this.Book.findAll();
    // const authors = await this.Author.findAll();
    // return books.map(async (book) => {
    //   // const author = authors.find((author) => author.id == book.author);
    //   const author = await this.Author.find(book.author);
    //   return { ...book, author };
    // });
    return books;
  }

  // getBookById(id) {
  //   return books.find((book) => {
  //     if (book.id === id) {
  //       const author = authors.find((author) => author.id == book.author);
  //       book.author = author;
  //       return book;
  //     }
  //   });
  // }
}

module.exports = new BookController();
