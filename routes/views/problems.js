const express = require('express')
const router = express.Router()
const {
    createProblem,
    getProblemList,
    getProblem,
    deleteProblem
} = require('../../controller/problemController')
const requireAuth = require('../../middleware/requireAuth')

// require auth for all problem routes
router.use(requireAuth)

// GET list of all problems
router.get('/', getProblemList)

// GET single problem
router.get('/:id', getProblem)

// POST single problem
router.post('/', createProblem)

router.delete('/', deleteProblem)

module.exports = router
