const mysql = require("mysql2");
const dotenv = require("dotenv")
dotenv.config()
const connection = mysql.createPool({
  host: "localhost",
  user: "evangadi-admin",
  password: process.env.DB_PASSWORD,
  database: "evangadi-db",
});


module.exports = connection.promise()