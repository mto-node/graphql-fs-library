const { v4: uuidv4 } = require("uuid");

// Définissez le modèle User
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // defaultValue: sequelize.UUIDV4, // Définit la valeur par défaut comme un UUID généré automatiquement
        defaultValue: DataTypes.UUIDV4, // Définit la valeur par défaut comme un UUID généré automatiquement
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users", // Specify the custom table name explicitly
    }
  );
};
