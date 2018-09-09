const server = require("../../server")
const request = require("supertest")
const BASE_URL = "/api/v1/users"
const {setUp, tearDownConnection} = require("../../src/db/database-manager")
const {generateUserProps, generateDogPropsWithImage} = require("../helper/prop-generation")
const {createUser, createDog, createDogWithImage} = require("../helper/model-generation")


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

    describe("When adding dogs ", () => {

        it("should be able to save an image", async () => {
            const user = await createUser()
            const dogProps = generateDogPropsWithImage(user.id)
            const url = `${BASE_URL}/${user.id}/dogs`

            const {status, body} = await request(server)
                .post(url)
                .send(dogProps)

            expect(status).toBe(200)
            expect(body.image.image).toBeTruthy()

        })
    })

    describe("when getting an image", () => {
        it("Should be able to get an image", async () => {
            const dog = await createDogWithImage()
            const url = `${BASE_URL}/${dog.user_id}/dogs/${dog.id}/image/${dog.image.id}`

            const {status, body} = await request(server)
                .get(url)

            expect(status).toBe(200)
            expect(body.toString()).toBe(dog.image.image.toString())
        })
    })


})
