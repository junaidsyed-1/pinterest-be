var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel = require('../models/userModel');

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

router.post('/register', async function (req, res) {
  const { username, email, password } = req.body;
  const userData = new userModel({ username, email });

  userModel.register(userData, password)
    .then(function () {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/',
  failureFlash: true,
}), async function (req, res) { });

module.exports = router;
