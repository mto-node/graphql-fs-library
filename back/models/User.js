const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize"); // Assuming Sequelize instance is exported
const { v4: uuidv4 } = require("uuid");

// Définissez le modèle User
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4, // Définit la valeur par défaut comme un UUID généré automatiquement
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
});
