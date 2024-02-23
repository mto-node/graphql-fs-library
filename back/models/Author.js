// Définissez le modèle Author
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Author",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "authors", // Specify the custom table name explicitly
    }
  );
};
