const express = require('express')
const app = express()

const BASE_URL = "/api/v1"

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(`${BASE_URL}/users/`, require("./src/routers/user-router"))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
