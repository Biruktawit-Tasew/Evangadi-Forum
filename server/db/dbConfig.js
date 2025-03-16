const mysql2 = require("mysql2");
require("dotenv").config();
const dbConnection = mysql2.createPool({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});
dbConnection.getConnection((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = dbConnection.promise();
