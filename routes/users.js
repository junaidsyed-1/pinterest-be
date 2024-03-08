const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const passport = require('passport');

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))

// Create a new user
router.post('/register', function (req, res) {
  const { fullname, username, email, password } = req.body;
  const userData = new userModel({ fullname, username, email });
  userModel.register(userData, password)
    .then(function () {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    });
});

// Log in a user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));




module.exports = router;
