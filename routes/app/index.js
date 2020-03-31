const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.render("lobby", { title: "Lobby", user: req.user });
});

router.get("/game", (req, res) => {
  res.render("game", { title: "Game" });
});


module.exports = router;
