const generateFilePath = require('../utilities/generateFilePath')
const executeCode = require('../utilities/executeCode')
const Problem = require('../models/problemSchema')
const Submission = require('../models/submissionSchema')

// Run a problem
const runProblem = async (req, res) => {
    const { language, code, input } = req.body

    let emptyFields = []
    if (!language) {
        emptyFields.push('language')
    }
    if (!code) {
        emptyFields.push('code')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const filePath = await generateFilePath(language, code)
        const output = await executeCode(filePath, language, input)
        res.status(200).json({output: output})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const submitProblem = async (req, res) => {
    const user_id = req.user._id
    const { language, code, problem_id } = req.body

    let emptyFields = []
    if (!language) {
        emptyFields.push('language')
    }
    if (!code) {
        emptyFields.push('code')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // entry in submissions model and setting verdict as in_process
    const submission = await Submission.create({user_id, problem_id, verdict: 'In_Process', language})
    try {
        const filePath = await generateFilePath(language, code)
        const problem = await Problem.findById({_id: problem_id})
        if (!problem){
            return res.status(404).json({error: 'No such problem'})
        }
        const testCases = problem.test_cases
        const totalTestCases = testCases.length
        let testCasesPassed = 0
        let verdict = 'Failed'
        let score = 0

        for (const testCase of testCases) {
            const testCaseinput = testCase.input
            const testCaseOutput=testCase.output
            let codeOutput = await executeCode(filePath, language, testCaseinput)
            codeOutput = codeOutput.replace(/\n$/, '');
            if (codeOutput.trim() == testCaseOutput.trim()) {
                testCasesPassed += 1
                console.log(testCasesPassed);
            }
        }
            
        if (testCasesPassed > 0) {
            
            if (testCasesPassed == totalTestCases){
                verdict = 'Success'
            }
            score = testCasesPassed/totalTestCases * 100
        }

        // updating submission entry
        await Submission.findOneAndUpdate({_id: submission._id}, {verdict,score})
        res.status(200).json({totalTestCases, testCasesPassed, verdict})
    } catch (error) {
        res.status(404).json({error: error.message})
    }

}

module.exports = {
    runProblem,
    submitProblem
}
