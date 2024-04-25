const mongoose = require('mongoose');

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("MongoDB Connected Successfully!");
    }).catch((error) => {
        console.log("Error when connecting to MongoDB: " + error);
    });
};

module.exports = connectToDatabase;