const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/User");
const BookModel = require("../models/Book");
const AuthorModel = require("../models/Author");
const { userDatas, authorDatas, bookDatas } = require("./mockData");

require("dotenv").config(); // Load environment variables from .env file

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

// Define the models
const User = UserModel(sequelize, DataTypes);
const Book = BookModel(sequelize, DataTypes);
const Author = AuthorModel(sequelize, DataTypes);

// Establish relationship between Author and Book
Author.hasMany(Book);
Book.belongsTo(Author);

// Author.hasMany(Book, { foreignKey: "authorId" });
// Book.belongsTo(Author, { foreignKey: "authorId" });

// Synchronize the models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Create the tables if they do not exist
    // await sequelize.sync();

    // This will create the tables if they don't exist and drop them if they do (force: true)
    // await sequelize.sync({ force: true });

    // await initDb();

    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const initDb = async () => {
  try {
    // Create mock users
    const password = await bcrypt.hash("123456", 10);
    await User.bulkCreate(
      [
        {
          name: "Admin",
          email: "admin@yahoo.com",
          password: password,
        },
        {
          name: "User",
          email: "user@yahoo.com",
          password: password,
        },
      ]
      // userDatas.map(async (user) => ({
      //   // id: uuidv4(), // Generate UUID for id field
      //   name: user.name,
      //   email: user.email,
      //   password: password, // Hash the password,
      //   // password: await bcrypt.hash(user.password, 10), // Hash the password,
      // }))
    );

    // Create mock authors
    await Author.bulkCreate(authorDatas);

    // // Create mock books
    await Book.bulkCreate(
      bookDatas.map((book) => ({
        title: book.title,
        AuthorId: book.author,
      }))
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("La base de donnée a bien été initialisée !");
};

module.exports = { initDb, User, Book, Author };
