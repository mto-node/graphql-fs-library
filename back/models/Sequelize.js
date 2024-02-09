const { Sequelize } = require("sequelize");
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

// // Establish relationship between Author and Book
// Author.hasMany(Book);
// Book.belongsTo(Author);

// Synchronize the models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Create the tables if they do not exist
    await sequelize.sync();

    // This will create the tables if they don't exist and drop them if they do (force: true)
    // await sequelize.sync({ force: true });

    // // Create mock users
    // const users = await User.bulkCreate([
    //   { name: "Admin", email: "admin@yahoo.com" },
    //   { name: "User", email: "user@yahoo.com" },
    // ]);

    // // Create mock authors
    // const authors = await Author.bulkCreate([
    //   { name: "George Orwell" },
    //   { name: "Aldous Huxley" },
    // ]);

    // // Create mock books
    // await Book.bulkCreate([
    //   { title: "1984", AuthorId: authors[0].id },
    //   { title: "Brave New World", AuthorId: authors[1].id },
    // ]);

    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
