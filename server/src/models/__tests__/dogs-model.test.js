const {setUp, tearDownConnection} = require("../../db/database-manager")
const dogsModel = require("../dogs-model")
const {generateDogProps} = require("../../../test/helper/prop-generation")
const {createUser, createDog} = require("../../../test/helper/model-generation")
const faker = require("faker")
const path = require("path")
const fs = require("fs")

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

    await createDog(createdUser.id)
    await createDog(createdUser.id)

    const dogs = await dogsModel.findDogsForUser(createdUser.id)
    expect(dogs.length).toBe(2)
})

describe("when saving a file", () => {

    it.skip("Should be able to save it?", async () => {
        let user = await createUser()

        console.log(dogsModel)

        const imagePath = path.join(__dirname, "../../../test/images/logo.png")
        const image = fs.readFileSync(imagePath)

        await createDog(user.id)
        const dog = (await dogsModel.findDogsForUser(user.id))[0]
        dog.image = image
        let updatedDog = await dog.save()
        fs.writeFileSync(__dirname + "/test.png", updatedDog.image)
        console.log(updatedDog)


        console.log(image)

    })
})
