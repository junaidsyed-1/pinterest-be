const mongoose = require('mongoose');

async function connectToMongoDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/pinterest-complete');
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error, "Error")
    }
};

module.exports = connectToMongoDb