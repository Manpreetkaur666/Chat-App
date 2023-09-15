const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config();
require('dotenv').config({ path: '../.env' });


const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

const connectToMongo = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`connects to Mongo Successfully!: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectToMongo;