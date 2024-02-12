// const { authors, authors } = require("../data");
const { Author, Book } = require("../db/Sequelize");

class AuthorController {
  constructor() {}

  async getAuthors() {
    console.log("fetch authors");

    // Fetch all authors with their associated authors in a single query
    const authors = await Author.findAll();
    // const authors = await Author.findAll({ include: Book });
    return authors;
  }

  async getAuthorById(id) {
    console.log("getAuthorById");
    return await Author.findByPk(id);
  }
}

module.exports = new AuthorController();
