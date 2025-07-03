const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const connnectToDB = require('./database/db')

const app = express();

app.use(express.json)

const PORT = process.env.PORT || 3000;

connnectToDB();

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})