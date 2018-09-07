const {setUp, tearDownConnection} = require("../../db/database-manager")
const imagesModel = require("../images-model")
const {createUser, createDog} = require("../../../test/helper/model-generation")
const imageBinary = require("../../../test/helper/load-image")


describe("The images model", () => {
    let dog
    beforeAll(async () => {
        await setUp()
        let user = await createUser()
        dog = await createDog(user.id)
    })

    afterAll(async () => {
        await tearDownConnection()
    })


    it("I save an image based on a dogs id", async () => {
        const image = await imagesModel.insertImage(dog.id, imageBinary)
        expect(image.image).toBe(imageBinary)
    })

})
