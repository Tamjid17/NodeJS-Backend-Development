const express = require('express');

const app = express();

// define middleware function
const myFirstMiddleware = (req,res, next) => {
    console.log('this first middleware will run on every request');

    next()
}

app.use(myFirstMiddleware)

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get("/about", (req, res) => {
  res.send("About Page");
});

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
