const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET)
}

// Create a new user - Signup
const createUser = async (req, res) => {
    const {email, password, username} = req.body
    try {
        const user = await User.signup(email, username, password)

        // create token
        const token = createToken(user._id)
        res.status(200).json({email, token}) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUser,
    loginUser
}