const mongoose = require('mongoose');

async function connectToMongoDb() {
    try {
        mongoose.connect('mongodb://localhost:27017/pinterest');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    };
};

module.exports = connectToMongoDb;