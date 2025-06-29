const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch(e) {
        console.error("Database connection failed", e);
        process.exit(1);
    }
}

module.exports = connectToDB;