const express = require("express");
const { registerUser } = require('../../db/user');
const router = express.Router();
const passport = require('../../config/auth');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/signin", 
  ensureLoggedOut('/'),
  (req, res) => {
    res.render("signin", { title: "Sign In" });
  });

router.post('/signin',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signin' })
);

router.get("/signup", 
  ensureLoggedOut('/'),
  (req, res) => {
    res.render("signup", { title: "Sign Up" });
  });

router.post("/signup", async (req, res) => {
  let result = await registerUser(req.body.username, req.body.password);
  if(result.error) {
    res.redirect('signup');
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
