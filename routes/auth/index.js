const express = require("express");
const db = require("../../db");
const router = express.Router();

const table = "quotes_table";

router.get("/quotes", (req, res) => {
  db.any(`SELECT * FROM ${table}`)
    .then((results) => {
      res.json([...results]);
    })
    .catch((error) => {
      res.json({
        error,
      });
    });
});

module.exports = router;
