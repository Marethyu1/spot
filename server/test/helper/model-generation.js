const {generateUserProps, generateDogProps, generateDogPropsWithImage} = require("./prop-generation")
const userModel = require("../../src/models/user-model")
const dogsModel = require("../../src/models/dogs-model")

const createUser = () => {
    const props = generateUserProps()
    return userModel.upsert(props)
}

const createDog = (user_id) => {
    const props = generateDogProps(user_id)
    return dogsModel.create(props)
}

const createDogWithImage = async (user_id) =>{
    if (!user_id) {
        const user = await createUser()
        user_id = user.id
    }
    const props = generateDogPropsWithImage(user_id, false)
    return dogsModel.create(props)

}

module.exports = {
    createUser,
    createDog,
    createDogWithImage
}
