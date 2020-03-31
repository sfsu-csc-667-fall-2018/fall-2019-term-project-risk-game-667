const express = require("express");
const crypto = require('crypto');
const db = require("../../db");
const router = express.Router();


router.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

router.post("/signup", (req, res) => {
  let user = {
    id: crypto.createHash('sha256').update(req.body.username).digest('hex'),
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
  };

  db.any(`INSERT INTO user_table ("id", "username", "password") VALUES ('${user.id}', '${user.username}', '${user.password}');`)
    .then((results) => {
      console.log(results);
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
