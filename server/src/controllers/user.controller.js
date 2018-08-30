const userModel = require("../models/user-model")

const create  = async (req, res, next) => {
    try {
        const model = await userModel.upsert(req.body)
            .catch((err) => {
                console.log("Error oh no!")
                res.status(500).send(err)
            })
        if (model){
            res.send(model.toJSON())
        } else {
            res.status(500).send("Oh dear")
        }
    } catch (err) {
        res.status(500).send("Oh dear")
    }
}

module.exports = {
    create
}
