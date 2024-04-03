const Problem = require('../models/problemSchema')
const mongoose = require('mongoose')


// Creating a new problem
const createProblem = async (req, res) => {
    const created_by = req.user._id
    const {title, description, test_cases, tag, difficulty} = req.body

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!test_cases) {
        emptyFields.push('test_cases')
    }
    if (!tag) {
        emptyFields.push('tag')
    }
    if (!difficulty) {
        emptyFields.push('difficulty')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const problem = await Problem.create({created_by, title, description, test_cases, tag, difficulty})
        res.status(200).json(problem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// get list of all problems
const getProblemList = async (req, res) => {
    const problemList = await Problem.find({}, '_id title tag difficulty').sort({createdAt: -1})
    res.status(200).json(problemList)
}


// get a single problem
const getProblem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such problem'})
    }
    
    const problem = await Problem.findById(id)
    if (!problem){
        return res.status(404).json({error: 'No such problem'})
    }
    res.status(200).json(problem)
}


// delete a problem
const deleteProblem = async (req, res) => {
    const user_id = req.user._id
    const { id } = req.query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such problem'})
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'No such user'})
    }
    
    const problem = await Problem.findOneAndDelete({_id: id, created_by: user_id})
    if (!problem){
        const problem = await Problem.findById(id)
        if (!problem) {
            return res.status(404).json({error: 'No such problem'})
        }
        // only problem creator can delete the problem
        return res.status(404).json({error: 'You cannot delete this problem'})
    }
    res.status(200).json(problem)
}

module.exports = {
    createProblem,
    getProblemList,
    getProblem,
    deleteProblem
}

