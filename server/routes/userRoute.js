const express = require("express");

const router = express.Router();


const { register, checkUser } = require("../controller/userController");


router.post("/register", register);


router.get("/check", checkUser);

module.exports = router;
