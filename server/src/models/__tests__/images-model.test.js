const {setUp, tearDownConnection} = require("../../db/database-manager")
const imagesModel = require("../images-model")
const {createUser} = require("../../../test/helper/model-generation")
const imageBinary = require("../../../test/helper/load-image")


describe("The images model", () => {
    beforeAll(async () => {
        await setUp()
        let user = await createUser()
    })

    afterAll(async () => {
        await tearDownConnection()
    })


    it("It should save an image", async () => {
        const image = await imagesModel.insertImage(imageBinary)
        expect(image.image).toBe(imageBinary)
    })

})
