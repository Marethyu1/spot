const { setUp, tearDownConnection } = require('../../db/database-manager')
const imagesModel = require('../images-model')
const imageBinary = require('../../../test/helper/load-image')


describe('The images model', () => {
  let image
  beforeAll(async () => {
    await setUp()
    image = await imagesModel.insertImage(imageBinary)
  })

  afterAll(async () => {
    await tearDownConnection()
  })

  it('It should save an image', async () => {
    expect(image.image).toBe(imageBinary)
  })

  it('Should prepocess the image into a thumbnail', async () => {
    expect(image.thumbnail).toBeTruthy()
  })

  it('Should preprocess the image into a pin', async () => {
    expect(image.pin).toBeTruthy()
  })
})
