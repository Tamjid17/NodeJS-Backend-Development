const dotenv = require('dotenv');
const express = require('express');
const connectToDB = require('./database/db');
const bookRoutes = require('./routes/book-routes')

dotenv.config();

const app = express();

const PORT = process.env.PORT;

//connection to db
connectToDB();

//middleware -> express.json()
app.use(express.json());

// book routes here
app.use('/api/books', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})