const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const passport = require('passport');

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))

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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});


module.exports = router;
