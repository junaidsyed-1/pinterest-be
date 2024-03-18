var express = require('express');
const isLoggedIn = require('../middleware/auth');
const userModel = require('../models/userModel');
var router = express.Router();
const upload = require('./multer');
const postModel = require('../models/postModel');

// Sign Up page
router.get('/', function (req, res,) {
  res.render('index');
});

// Log in page
router.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') });
});

// Feed Page
router.get('/feed', function (req, res, next) {
  res.render('feed')
})

// Profile page
router.get('/profile', isLoggedIn, async function (req, res) {
  const userData = await userModel.findOne({ username: req.session.passport.user }).populate('posts');
  res.render('profile', { user: userData });
});

// Log out
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

// File Upload
router.post('/upload', isLoggedIn, upload.single('file'), async function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No files were found' })
  };

  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    postText: req.body.filecaption,
    image: req.file.filename,
    user: user._id,
  })

  user.posts.push(post._id);
  await user.save();

  res.redirect('/profile');
});

module.exports = router;
