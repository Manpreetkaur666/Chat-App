const express = require('express');
const User = require('../models/userModel');
const {registerUser, authUser} = require('../contollers/userController')
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', authUser);

module.exports = router;