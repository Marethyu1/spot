const {setUp, tearDownConnection} = require("../../db/database-manager")
const dogsModel = require("../dogs-model")
const {generateDogProps} = require("../../../test/helper/prop-generation")
const {createUser, generateDog} = require("../../../test/helper/model-generation")
const faker = require("faker")

let user
beforeAll(async () => {
    await setUp()
    user = await createUser()
})

afterAll(async () => {
    await tearDownConnection()
})


test("I can create a dog", async () => {
    const dogProps = generateDogProps(user.id)
    const dog = await dogsModel.create(dogProps)
    Object.keys(dogProps).forEach(key => {
        expect(dogProps[key]).toBe(dog[key])
    })
})


test("I can get dogs based on my user id", async () => {
    const createdUser = await createUser()

    await generateDog(createdUser.id)
    await generateDog(createdUser.id)

    const dogs = await dogsModel.findDogsForUser(createdUser.id)
    expect(dogs.length).toBe(2)
})
