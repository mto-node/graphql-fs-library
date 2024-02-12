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

  async addAuthor(name) {
    console.log("addAuthor");
    try {
      const author = await Author.create({ name });
      return author;
    } catch (error) {
      console.error("Error adding author:", error);
      throw error;
    }
  }

  async updateAuthor(id, name) {
    console.log("updateAuthor");
    try {
      const author = await Author.findByPk(id);
      if (!author) {
        throw new Error("Author not found");
      }
      author.name = name;
      await author.save();
      return author;
    } catch (error) {
      console.error("Error updating author:", error);
      throw error;
    }
  }

  async deleteAuthor(id) {
    console.log("deleteAuthor");
    try {
      const author = await Author.findByPk(id);
      if (!author) {
        throw new Error("Author not found");
      }
      await author.destroy();
      return author;
    } catch (error) {
      console.error("Error deleting author:", error);
      throw error;
    }
  }
}

module.exports = new AuthorController();
