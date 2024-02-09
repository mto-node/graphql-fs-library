const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize"); // Assuming Sequelize instance is exported

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Book;
