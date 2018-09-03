const {generateUserProps, generateDogProps} = require("./prop-generation")
const userModel = require("../../src/models/user-model")
const dogsModel = require("../../src/models/dogs-model")

const createUser = () => {
    const props = generateUserProps()
    return userModel.upsert(props)
}

const generateDog = (user_id) => {
    const props = generateDogProps(user_id)
    return dogsModel.create(props)
}

module.exports = {
    createUser,
    generateDog
}
