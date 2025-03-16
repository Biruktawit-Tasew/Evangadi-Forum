const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");


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
      const existingUser = await User.findByEmailOrUsername(email, username);
      if (existingUser.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "you already have an account" });
      }

      await User.create({ username, first_name, last_name, email, password });
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
      const user = await User.findByEmailOrUsername(email, username);
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
};

module.exports = userController;
