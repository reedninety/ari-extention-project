var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userMustBeLoggedIn(req, res, next) {
    //see if you have a token in your authorisation header. good to put a question mark bc if you don't send a token it will fail
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    //verify token to make sure it isn't made up or expired
    //this decoded payload is the object that we signed in users route
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is okay and you're allowed in
        //we are attaching it so we don't need to find it again
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}

module.exports = userMustBeLoggedIn;