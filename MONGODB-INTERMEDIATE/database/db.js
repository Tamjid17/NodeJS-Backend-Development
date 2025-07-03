const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const connnectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connection established successfully");
    } catch(e) {
        console.error("Connection to Database failed: ", e)
    }
}

module.exports = connnectToDB;