// Définissez le modèle Book
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Book", {
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
};
