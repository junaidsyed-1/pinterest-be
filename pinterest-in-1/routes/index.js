var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/auth');
const upload = require('./multer');
const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { nav: false });
});

router.get('/register', function (req, res,) {
  res.render('register', { nav: false });
});

router.get('/profile', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate('posts')
  res.render('profile', { user, nav: true })
});

router.post('/fileupload', isLoggedIn, upload.single('dp'), async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });

  user.profileimage = req.file.filename;
  await user.save();
  res.redirect('/profile');
});

router.get('/add', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render('add', { user, nav: true })
});

// Feed
router.get('/feed', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });

  const posts = await postModel.find().populate('user');

  res.render('feed', { user, posts, nav: true })
});

router.get('/show/posts', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate('posts')
  res.render('show', { user, nav: true })
});

// Add a post
router.post('/createpost', isLoggedIn, upload.single('postimage'), async function (req, res) {
  try {
    const { title, description } = req.body;
    const user = await userModel.findOne({ username: req.session.passport.user });

    if (!user) {
      throw new Error('User not found');
    }

    const post = await postModel.create({
      user: user._id,
      title,
      description,
      image: req.file.filename
    });

    user.posts.push(post._id);
    await user.save();

    res.redirect('/profile');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error creating post');
  }
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
