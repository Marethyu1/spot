const server = require("../../server")
const request = require("supertest")
const BASE_URL = "/api/v1/users"
const {setUp, tearDownConnection} = require("../../src/db/database-manager")
const {generateUserProps} = require("../helper/prop-generation")


describe("the user routes", () => {

    beforeAll(async () => {
        await setUp()
    })

    afterAll(async () => {
        await tearDownConnection()
    })

    describe("When creating a job", () => {
        it("Should be able to create a job", async () => {
            const userProps = generateUserProps()
            const res = await request(server)
                .post(BASE_URL)
                .send(userProps)

            expect(res.status).toBe(200)
        })
    })
})
