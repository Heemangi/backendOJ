const express = require('express')
const router = express.Router()
const {
    runProblem,
    submitProblem
} = require('../../controller/codeController')
const requireAuth = require('../../middleware/requireAuth')

// require auth for all code routes
router.use(requireAuth)

// run a problem
router.post('/run', runProblem)

// submit a problem
router.post('/submit', submitProblem)

module.exports = router