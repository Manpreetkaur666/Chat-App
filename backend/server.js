const express = require('express');
const chats = require('./data/data');

// to make console in terminal colorful
const colors = require('colors');
const connectToMongo = require('./db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');
require("dotenv").config();
require('dotenv').config({ path: '../.env' });



const app = express();
const PORT = process.env.PORT;
console.log(`"Port is : ${PORT}`);
console.log("hello");

connectToMongo();

app.use(express.json()); // to accept json data

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/auth', require('./routes/userRoute'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,
    console.log(`Server Started on PORT ${PORT}`.yellow.bold));