var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/auth');
const upload = require('./multer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res,) {
  res.render('register');
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile')
});

router.post('/fileupload', isLoggedIn, upload.single('dp'), async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });

  user.profileimage = req.file.filename;
  await user.save();
  res.redirect('/profile');

});


router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
