const express = require("express");
const app = express();
const port = 2017;

// user routes middleware file
const connection = require("./db/dbConfig");

//json middleware to extract json data
app.use(express.json())

// user routes middleware

// question routes middleware

// answer routes middleware
start = async () =>{
    try {
      const result = await connection.execute("select 'test'"); 
      console.log("database connection is successful");
      app.listen(port, () => console.log(`listening at http://localhost:${port}`));
    } catch (error) {
        console.log(error.message);
    }
}
start()


//command to create table on mysql

//CREATE TABLE if not exists registration(
// user_id INT(20) NOT NULL AUTO_INCREMENT,
// username VARCHAR(20) NOT NULL,
// email VARCHAR(40) NOT NULL,
// password VARCHAR(100) NOT NULL,
// PRIMARY KEY (user_id)
// );
//CREATE TABLE if not exists profile(
// user_profile_id INT(20) NOT NULL AUTO_INCREMENT,
// user_id INT(20) NOT NULL,
// firstname VARCHAR(20) NOT NULL,
// lastname VARCHAR(20) NOT NULL,
// PRIMARY KEY (user_profile_id),
// FOREIGN KEY (user_id) REFERENCES registration(user_id));
// );
//CREATE TABLE if not exists questions(
// id INT(20) NOT NULL AUTO_INCREMENT,
// question_id VARCHAR(100) NOT NULL UNIQUE,
// user_id INT(20) NOT NULL,
// title VARCHAR(50) NOT NULL,
// description TEXT NOT NULL,
// tag VARCHAR(20),
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// PRIMARY KEY (id,question_id),
// FOREIGN KEY (user_id) REFERENCES users(user_id));

// CREATE TABLE if not exists answers(
// answer_id INT(20) NOT NULL AUTO_INCREMENT,
// user_id INT(20) NOT NULL,
// question_id VARCHAR(100) NOT NULL,
// answer TEXT NOT NULL,
// PRIMARY KEY (answer_id),
// FOREIGN KEY (question_id) REFERENCES questions(question_id),
// FOREIGN KEY (user_id) REFERENCES users(user_id))
// );

