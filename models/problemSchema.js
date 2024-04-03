const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = require('./userSchema')

const testCaseSchema = new Schema({
    input: {
        type: String
    },
    output: {
        type: String,
        required: true
    }
})

const problemSchema = new Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    test_cases: [testCaseSchema],
    tag: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Problem', problemSchema)
