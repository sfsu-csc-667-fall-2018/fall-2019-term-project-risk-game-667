const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("lobby", { title: "Lobby" });
});

router.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

router.get("/game", (req, res) => {
  res.render("game", { title: "Game" });
});


module.exports = router;
