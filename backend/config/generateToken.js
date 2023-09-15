const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config();
require('dotenv').config({ path: '../.env' });
const privateKey = process.env.JWT_SECRET;

const generateToken = (id) => {
    var authToken = jwt.sign({ id }, privateKey, {
        expiresIn: '30d'
    });
    return authToken;
}

module.exports = generateToken