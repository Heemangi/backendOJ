const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')


const outputDirectory = path.join(__dirname, '../outputs')
if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory, {recursive: true})
}

const inputDirectory = path.join(__dirname, '../inputs')
if (!fs.existsSync(inputDirectory)){
    fs.mkdirSync(inputDirectory, {recursive: true})
}

const executeCode = async (filePath, language, input) => {
    const fileID = path.basename(filePath).split('.')[0]
    const outputPath = path.join(outputDirectory, `${fileID}.exe`)

    const inputPath = path.join(inputDirectory, `${fileID}.txt`)
    await fs.writeFileSync(inputPath, input);

    const executeCommands = {
        cpp: [`g++ ${filePath} -o ${outputPath} && cd ${outputDirectory} && .\\${fileID}.exe < ${inputPath}`],
        py: [`python ${filePath} < ${inputPath}`],
        java: [`java ${filePath} < ${inputPath}`]
    }

    return new Promise((resolve, reject) => {
        exec(executeCommands[language][0], (error, stdout, stderr) => {
            if (error){
                reject(error)
            }
            if (stderr){
                reject(stderr)
            }
            resolve(stdout)
        })
    })
}

module.exports = executeCode
