const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/config/.env' });

const mongoURI = 'mongodb://localhost:27017/E_Commerce';

const connectToMongoose = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connectToMongoose;
