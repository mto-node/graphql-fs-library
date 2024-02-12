// const { users, users } = require("../data");
const { User } = require("../db/Sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class UserController {
  constructor() {}

  async getUsers() {
    console.log("fetch users");
    // Fetch all users with their associated users in a single query
    const users = await User.findAll();
    // const users = await User.findAll({ include: Book });
    return users;
  }

  async getUserById(id) {
    console.log("getUserById");
    return await User.findByPk(id);
  }

  async addUser(name, email, password) {
    console.log("addUser");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: uuidv4(), name, email, password: hashedPassword };
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  async updateUser(id, name, email, password) {
    console.log("updateUser");
    try {
      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      // Update user properties
      user.name = name;
      user.email = email;

      // Hash and update password if provided
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      // Save the updated user to the database
      await user.save();

      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(id) {
    console.log("deleteUser");
    try {
      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      // Delete the user from the database
      await user.destroy();

      return user;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

module.exports = new UserController();
