const server = require("../../server")
const request = require("supertest")
const BASE_URL = "/api/v1/users"
const {setUp, tearDownConnection} = require("../../src/db/database-manager")
const {generateUserProps} = require("../helper/prop-generation")
const {createUser, createDog} = require("../helper/model-generation")


describe("the user routes", () => {

    beforeAll(async () => {
        await setUp()
    })

    afterAll(async () => {
        await tearDownConnection()
    })

    describe("When creating a user", () => {
        it("Should be able to create a user", async () => {
            const userProps = generateUserProps()
            const res = await request(server)
                .post(BASE_URL)
                .send(userProps)

            expect(res.status).toBe(200)
        })
    })

    describe("When searching for a users dogs", () => {

        let user
        beforeAll(async () => {
            user = await createUser()
            await createDog(user.id)
            await createDog(user.id)
        })

        it("Should be able to search for the users dogs", async () => {
            const {body} = await request(server)
                .get(`${BASE_URL}/${user.id}/dogs`)

            expect(body.dogs.length).toBe(2)
        })
    })

})
