const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const connnectToDB = require('./database/db')
const productRoutes = require('./routes/product-routes')
const bookRoutes = require('./routes/book-routes')

const app = express();


const PORT = process.env.PORT || 3000;

connnectToDB();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/reference', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})