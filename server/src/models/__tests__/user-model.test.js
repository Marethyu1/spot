const {setUp} = require("../../db/database-manager")
const userModel = require("../user-model")
const {generateUserProps} = require("../../../test/helper/prop-generation")
const faker = require("faker")
let db


beforeAll(async () => {
    db = await setUp()
})

afterAll(async () => {
    await db.closeConnection()
})


test("I can create a user", async () => {
    const user = generateUserProps()
    const model  = await userModel.upsert(user)
    expect(model).toBeTruthy()
    expect(model.name).toBe(user.name)
})

test("I can update a user if one with the same id already exists", async () => {
    const userProps = generateUserProps()
    const createdUser = await userModel.upsert(userProps)
    const updatedUser = {
        ...userProps,
        email: faker.internet.email(),
    }
    expect(updatedUser.email).not.toBe(createdUser.email)
    const updatedModel = await userModel.upsert(updatedUser)
    expect(updatedModel.email).toBe(updatedUser.email)
})
