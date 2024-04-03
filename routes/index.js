const express = require('express')
const router = express.Router()
const problem = require('./views/problems')
const submission = require('./views/submissions')
const user = require('./views/users')
const code = require('./views/code')

router.get('/', (req, res) => {
    res.json({msg: 'BASE ROUTE'})
    console.log("Working")
})

router.use('/problems', problem)
router.use('/submissions', submission)
router.use('/users', user)
router.use('/code', code)


module.exports = router
