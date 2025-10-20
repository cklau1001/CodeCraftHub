// src/controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseHandler = require('../utils/responseHandler');

// Register a new user
exports.registerUser = async (req, res) => {
    
    console.log("[User Registration] entered");

    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        responseHandler.sendSuccess(res, 'User registered successfully');
    } catch (error) {
        responseHandler.sendError(res, 'Error registering user', error);
    }
};

// Login a user
exports.loginUser = async (req, res) => {

    console.log("[User Login] entered");

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("[User Login]: User not found");
            return responseHandler.sendError(res, 'User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("[User Login]: Password not matched");
            return responseHandler.sendError(res, 'Invalid credentials');
        }
        
        console.log("[User Login]: Generate token");

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        responseHandler.sendSuccess(res, { token });
    } catch (error) {
        responseHandler.sendError(res, 'Error logging in', error);
    }
};

// hello
exports.hello = async(req, res) => {
    console.log("[HELLO]: entered");
    responseHandler.sendSuccess(res, 'Hello');
};
