const express = require("express");
const { registerUser } = require('../../db/user');
const router = express.Router();
const passport = require('../../config/auth');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/signin", 
  ensureLoggedOut('/'),
  (req, res) => {
    let error = req.session.messages ? req.session.messages[0] : null; // TOFIX seems a bit hack and not consistent with signup
    res.render("signin", { title: "Sign In", error });
  });

router.post('/signin',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signin', failureMessage: 'Wrong username or password!' })
);

router.get("/signup", 
  ensureLoggedOut('/'),
  (req, res) => {
    res.render("signup", { title: "Sign Up" });
  });

router.post("/signup", async (req, res) => {
  let result = await registerUser(req.body.username, req.body.password);
  if(result.error) {
    res.render("signup", { title: "Sign Up", error: result.error });
  }
  res.redirect(307, '/signin');
});

router.get('/signout',
  ensureLoggedIn('/signin'), 
  (req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
