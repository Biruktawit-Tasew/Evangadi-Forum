const dbConnection = require("../db/dbconfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    const { username, first_name, last_name, email, password } = req.body;

    if (!username || !first_name || !last_name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Password must be at least 8 characters" });
    }

    try {
      const existingUser = await userController.findByEmailOrUsername(
        email,
        username
      );
      if (existingUser.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "You already have an account" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const query = `
        INSERT INTO users (username, first_name, last_name, email, password)
        VALUES (?, ?, ?, ?, ?)
      `;
      await dbConnection.execute(query, [
        username,
        first_name,
        last_name,
        email,
        hashedPassword,
      ]);

      res
        .status(StatusCodes.CREATED)
        .json({ message: "User registered successfully!" });
    } catch (err) {
      console.error("Error registering user:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  checkUser: async (req, res) => {
    const { email, username } = req.query;

    if (!email && !username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Email or username is required" });
    }

    try {
      const user = await userController.findByEmailOrUsername(email, username);
      if (user.length > 0) {
        return res.status(StatusCodes.OK).json({ exists: true, user: user[0] });
      } else {
        return res.status(StatusCodes.OK).json({ exists: false });
      }
    } catch (err) {
      console.error("Error checking user:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  findByEmailOrUsername: async (email, username) => {
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    const [rows] = await dbConnection.execute(query, [email, username]);
    return rows;
  },
};

module.exports = userController;
