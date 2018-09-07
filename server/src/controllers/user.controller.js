const userModel = require("../models/user-model")
const dogsModel = require("../models/dogs-model")


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


const findDogs = async (req, res) => {
    const {user_id} = req.params
    const dogs = await dogsModel.findDogsForUser(user_id)
    const body = {
        dogs: dogs.map(x => x.toJSON())
    }
    res.send(body)
}

const createDog = async (req, res) => {
    const {user_id} = req.params
    const dogs = await dogsModel.create(req.body)
    const body = dogs.toJSON()
    res.send(body)
}



module.exports = {
    create,
    findDogs,
    createDog
}
