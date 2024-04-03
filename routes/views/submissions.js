const express = require('express')
const router = express.Router()
const {
    getProblemLeaderboard,
    getUserProblemSubmission
} = require('../../controller/submissionController')
const requireAuth = require('../../middleware/requireAuth')

// require auth for all submission routes
router.use(requireAuth)

// GET submission data
router.get('/leaderboard/', getProblemLeaderboard)

// GET submissions for a problem (problem leaderboard)
router.get('/', getUserProblemSubmission)


module.exports = router
