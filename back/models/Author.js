const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize"); // Assuming Sequelize instance is exported

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Author;
