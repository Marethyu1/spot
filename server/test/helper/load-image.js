const fs = require("fs")
const path = require("path")

const bitmap = fs.readFileSync(path.join(__dirname, "../images/logo.png"))
module.exports = bitmap
