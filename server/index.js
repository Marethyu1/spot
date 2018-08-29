const express = require('express')
const app = express()
const http = require("http")
const https = require("https")
const fs = require("fs")

const options = {
    key: fs.readFileSync('./cert/client-key.pem'),
    cert: fs.readFileSync('./cert/client-cert.pem')
};

const {getDatabase, setUp} = require("./src/db/database-manager")

const BASE_URL = "/api/v1"

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(`${BASE_URL}/users/`, require("./src/routers/user-router"))

getDatabase()

http.createServer(app).listen(3000);
https.createServer(options, app).listen(3001)
console.log("created some servers!")

// app.listen(3000, () => {
//     console.log(`app running in ${process.env.NODE_ENV} on port 3000`)
// })
