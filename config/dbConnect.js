const mongoose = require("mongoose");
require('dotenv').config()
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

module.exports = connectDb;
