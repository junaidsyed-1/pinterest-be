const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }


}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);