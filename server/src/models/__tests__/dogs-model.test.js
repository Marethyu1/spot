const { setUp, tearDownConnection } = require('../../db/database-manager')
const dogsModel = require('../dogs-model')
const { generateDogProps, generateDogPropsWithImage } = require('../../../test/helper/prop-generation')
const { createUser, createDog } = require('../../../test/helper/model-generation')
const faker = require('faker')
const path = require('path')
const fs = require('fs')

let user

describe('The dogs model', () => {
  beforeAll(async () => {
    await setUp()
    user = await createUser()
  })

  afterAll(async () => {
    await tearDownConnection()
  })


  it('Should create a dog', async () => {
    const dogProps = generateDogProps(user.id)
    const dog = await dogsModel.create(dogProps)
    Object.keys(dogProps).forEach((key) => {
      expect(dogProps[key]).toBe(dog[key])
    })
  })


  it('Can get dogs based on my user id', async () => {
    const createdUser = await createUser()

    await createDog(createdUser.id)
    await createDog(createdUser.id)

    const dogs = await dogsModel.findDogsForUser(createdUser.id)
    expect(dogs.length).toBe(2)
  })

  it('I can create a dog and save an image', async () => {
    const user = await createUser()
    const dogsProps = generateDogPropsWithImage(user.id, false)
    const dog = await dogsModel.create(dogsProps)

    expect(dog).toBeTruthy()
    expect(dog.image.image).toBe(dogsProps.image.image)
  })
})


describe('when saving a file', () => {
  it.skip('Should be able to save it?', async () => {
    const user = await createUser()


    const imagePath = path.join(__dirname, '../../../test/images/logo.png')
    const image = fs.readFileSync(imagePath)

    await createDog(user.id)
    const dog = (await dogsModel.findDogsForUser(user.id))[0]
    dog.image = image
    const updatedDog = await dog.save()
    fs.writeFileSync(`${__dirname}/test.png`, updatedDog.image)
  })
})
