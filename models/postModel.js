const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    like: {
        type: Array,
        default: [],
    }

}, { timestamp: true });

module.exports = mongoose.model('Post', postSchema);