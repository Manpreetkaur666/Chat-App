const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const comparePassword = require('../models/userModel');
const bcrypt = require('bcryptjs');


/******************** Route 1: Register New User ************************/
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all fields");
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(400);
            throw new Error("User already exists!");
        }
        
        const user = await User.create({
            name,
            email,
            password,
            photo,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                photo: user.photo,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error("Failed to create the User");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!");
    }
});


/******************** Route 2: Login Existing User ************************/
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all fields");
    }

    try {
        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {
            res.status(400);
            throw new Error("Please signup");
        }


        if (user.email === email && (await user.comparePassword(password))) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                photo: user.photo,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error("Failed to authenticate the User");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!");
    }
})

module.exports = { registerUser, authUser };

