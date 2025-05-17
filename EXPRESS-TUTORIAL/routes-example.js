const express = require('express');

const app = express();

//root route
app.get('/', (req, res) => {
    res.send('Welcome to our homepage')
});

//get all products
app.get('/products', (req, res) => {
    const products = [
        {
            id: 1,
            label: "Product 1",
        },
        {
            id: 2,
            label: "Product 2",
        },
        {
            id: 3,
            label: "Product 3",
        },
    ];

    res.json(products)
})

// get a single product
app.get('/products/:productId', (req, res) => {

    console.log("req.params", req.params);

    const productId = parseInt(req.params.productId);

    const products = [
        {
            id: 1,
            label: "Product 1",
        },
        {
            id: 2,
            label: "Product 2",
        },
        {
            id: 3,
            label: "Product 3",
        },
    ];

    const singleProduct = products.find((product) => product.id === productId);
    if(singleProduct){
        res.status(200).json(singleProduct)
    }
    else
        {
            res.status(404).send('Product not found')
        }
})

const port  = 3000

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
})