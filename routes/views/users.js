const express = require('express')
const router = express.Router()
const {
    createUser,
    loginUser
} = require('../../controller/userController')

// POST a new user
router.post('/signup', createUser)

// login
router.post('/login', loginUser)


module.exports = router
