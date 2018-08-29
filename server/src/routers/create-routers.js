const express = require("express")
const bodyParser = require("body-parser")

/**
 * Create a router with a json parser
 * @return {*} the router
 */
function jsonRouter() {
    const router = express.Router()
    router.use(bodyParser.json())
    return router
}


module.exports = {
    jsonRouter: jsonRouter,
}
