require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register controller
const registerUser = async (req, res) => {
    try {
        //extract user information from our request body
        const {username, email, password, role} = req.body;

        //check if the user already exists
        const checkExistingUser = await User.findOne({$or : [{username}, {password}]});
        if(checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with same username or email. Please try with a different username or email",
            });
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({username, email, password: hashedPassword, role: role || 'user'});
        if(newUser) {
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: newUser
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User creation was unsuccessful",
            });
        }
    } catch (e) {
        console.log('Error: ', e);
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
}

// login controller
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        // check user exists or not
        const checkUser = await User.findOne({ username });
        if(!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist, check with a different username",
            });
        }

        // check password
        const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
              success: false,
              message: "Invalid password",
            });
        }

        //create user token
        const accessToken = jwt.sign({
            userId : checkUser._id,
            username : checkUser.username,
            role : checkUser.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '15m'
        })

        res.status(200).json({
            success : true,
            message : 'Logged in successfully',
            accessToken
        })

    } catch(e) {
        console.log("Error: ", e);
        res.status(500).json({
          success: false,
          message: "Something went wrong, please try again",
        });
    }
}

module.exports = {registerUser, loginUser}