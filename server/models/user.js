const dbConnection = require("../db/dbConfig"); 
const bcrypt = require("bcrypt");

const User = {
  create: async (userData) => {
    const { username, first_name, last_name, email, password } = userData;

   
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (username, first_name, last_name, email, password)
      VALUES (?, ?, ?, ?, ?)
    `;

    
    return dbConnection.execute(query, [
      username,
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);
  },

  findByEmailOrUsername: async (email, username) => {
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";

   
    const [rows] = await dbConnection.execute(query, [email, username]);
    return rows;
  },
};

module.exports = User;
