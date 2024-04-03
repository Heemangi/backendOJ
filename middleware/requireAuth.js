const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')


const requireAuth = async (req, res, next) => {

    // verify authorization
    const {authorization} = req.headers
    if (!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    // authorization - > Bearer value.value.value
    const token = authorization.split(' ')[1]

    // verify the token
    try{
        const { _id } = jwt.verify(token, process.env.SECRET)

        // use this ID and fetch the User from db

        // attach user's id to user object so subsequent views can access user from request
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth