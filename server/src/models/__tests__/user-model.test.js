const {setUp} = require("../../db/database-manager")
const userModel = require("../user-model")
let db

beforeAll(async () => {
    db = await setUp()
})

afterAll(async () => {
    await db.closeConnection()
})


test("I create a user", async () => {
    const options = {
        name: "james",
        facebook_id: 12345

    }
    const model  = await userModel.upsert(options)
    expect(model).toBeTruthy()
    expect(model.name).toBe(options.name)

})
