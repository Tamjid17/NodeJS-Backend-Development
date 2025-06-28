const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        await mongoose.connect(
          `mongodb+srv://towhidulislam24:${process.env.DB_PASS}@meals.kceb8.mongodb.net/<dbname>?retryWrites=true&w=majority`
        );
        console.log("Database connected successfully");
    } catch(e) {
        console.error("Database connection failed", e);
        process.exit()
    }
}

module.exports = connectToDB;