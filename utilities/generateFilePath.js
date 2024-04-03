const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

const codeDirectory = path.join(__dirname, '../codes')
if (!fs.existsSync(codeDirectory)){
    fs.mkdirSync(codeDirectory, {recursive: true})
}

const generateFilePath = async (language, code) => {
    const fileName = `${uuid()}.${language}`
    const filePath = path.join(codeDirectory, fileName)
    await fs.writeFileSync(filePath, code)
    return filePath
}   

module.exports = generateFilePath