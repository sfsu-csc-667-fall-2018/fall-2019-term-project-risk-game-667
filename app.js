const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require('express-session');
const passport = require('./config/auth');

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
app.use(session({ 
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session());

app.use("/", appRouter);
app.use("/", authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = `${err.status} ${err.message}`;
  res.status(err.status || 500);
  res.render("error", { title: err.status });
});

module.exports = app;
