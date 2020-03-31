const express = require("express");
const crypto = require('crypto');
const { registerUser } = require('./helpers');
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

router.post("/signup", async (req, res) => {
  let user = {
    id: crypto.createHash('sha256').update(req.body.username).digest('hex'),
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
  };
  let result = await registerUser(user);
  if(result.error) {
    res.redirect('signup');
  }
  res.redirect('/');
});

module.exports = router;
