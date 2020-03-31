const express = require("express");
const { registerUser } = require('../../db/user');
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

router.post("/signup", async (req, res) => {
  let result = await registerUser(req.body.username, req.body.password);
  if(result.error) {
    res.redirect('signup');
  }
  res.redirect('/');
});

module.exports = router;
