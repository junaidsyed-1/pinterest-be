var express = require('express');
const isLoggedIn = require('../middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/login', function (req, res, next) {
  res.render('login')
});

router.get('/feed', function (req, res, next) {
  res.render('feed')
})

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});

module.exports = router;
