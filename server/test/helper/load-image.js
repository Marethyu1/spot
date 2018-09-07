const fs = require("fs")
const path = require("path")

const file = fs.readFileSync(path.join(__dirname, "../images/logo.png"))
module.exports = file
