const express = require('express');
const axios = require('axios');

const cors = require('cors');

const user_route = require('./routes/user_route');

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api', user_route);

app.get('/api/data', (req,res) => {
    res.send("Hello world");
})

app.get('/api/check', (req,res) => {
    res.send("Please wait");
})

app.get('/api/profile', (req, res) => {
    res.send("Data sent");
})
const port = 8000;

app.listen(port, () => {
    console.log(`server running at ${port}`);
})