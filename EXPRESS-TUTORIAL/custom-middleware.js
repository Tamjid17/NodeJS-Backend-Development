const express = require('express');

const app = express();

// custom middleware function
const requestTimestampLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`${timeStamp} from ${req.method} to ${req.url}`);
    next()
}

app.use(requestTimestampLogger)

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get("/About", (req, res) => {
  res.send("About Page");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})