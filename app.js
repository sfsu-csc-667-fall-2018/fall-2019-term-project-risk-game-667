const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const authRouter = require("./routes/auth");
const appRouter = require("./routes/app");

const app = express();

app.set("views", [ path.join(__dirname, "views"), path.join(__dirname, "views", "pages"), path.join(__dirname, "views", "auth")]);
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", appRouter);
app.use("/auth", authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; //TODO fix the way errors are displayed in production
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
