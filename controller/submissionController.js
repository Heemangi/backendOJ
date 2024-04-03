const Submission = require('../models/submissionSchema')
const mongoose = require('mongoose')


// get all submission for a problem
const getProblemLeaderboard = async (req, res) => {
    const { problem_id } = req.query

    if (!mongoose.Types.ObjectId.isValid(problem_id)) {
        return res.status(404).json({error: 'No such problem'})
    }

    const submissions = await Submission.find({problem_id}).populate('user_id').sort({score: -1, createdAt: -1})
    if (!submissions){
        return res.status(404).json({error: 'No submissions found for this problem'})
    }
    return res.status(200).json(submissions)
}

// GET submissions for a user to display past submissions for a problem
const getUserProblemSubmission = async (req, res) => {
    const user_id = req.user._id
    const { problem_id } = req.query

    if (!mongoose.Types.ObjectId.isValid(problem_id)) {
        return res.status(404).json({error: 'No such problem'})
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const submissions = await Submission.find({user_id, problem_id}).sort({createdAt: -1})
    if (!submissions){
        return res.status(404).json({error: 'No submissions found for this user'})
    }
    return res.status(200).json(submissions)
}


module.exports = {
    getProblemLeaderboard,
    getUserProblemSubmission
}

