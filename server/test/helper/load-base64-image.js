const bitmap = require("./load-image")
const encodedImage = new Buffer(bitmap).toString("base64")
module.exports = encodedImage
