var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
const db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const saltRounds = 10;
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn")

const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // checking if the user exists
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      //checking that the password matches 
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      //first argument of token is a payload(normally user_id because we ues the user_id to know who we are. second argument is an internal password)
      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//register endpoint
router.post("/register", async (req, res) => {
  const { username, password, user_firstname, user_surname } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (username, password, user_firstname, user_surname) VALUES ("${username}", "${hash}", "${user_firstname}", "${user_surname}")`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// want a get profile information for logged in users
router.get("/:id", userMustBeLoggedIn, async (req, res) => {
 const {user_id} = req;
try {
  const results = await db(`SELECT * FROM eventlist WHERE userid = ${user_id};`)
  res.send(results.data)
} catch (err) {
  res.status(500).send({ message: err.message });
};
});
module.exports = router;
