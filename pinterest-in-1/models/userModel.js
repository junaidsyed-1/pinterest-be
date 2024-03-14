const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    profileimage: {
        type: String,
    }

}, { timestamps: true });

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema);