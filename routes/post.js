const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

router.post('/createpost', async (req, res) => {
    const createdPost = await postModel.create({
        postText: "This is 3 post",
        user: "65e9b92fc496840771c3ff62"
    });

    let user = await userModel.findOne({ _id: "65e9b92fc496840771c3ff62" });
    user.posts.push(createdPost._id);
    await user.save();

    res.send("Post created");
});

// get all posts
router.get('/getposts', async (req, res) => {
    const allPosts = await userModel.findOne({ _id: "65e9b92fc496840771c3ff62" }).populate('posts');
    res.send(allPosts);
})

module.exports = router;