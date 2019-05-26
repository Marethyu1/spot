const request = require('supertest')
const server = require('../../server')

const BASE_URL = '/api/v1/users'
const { setUp, tearDownConnection } = require('../../src/db/database-manager')
const { generateUserProps, generateDogPropsWithImage } = require('../helper/prop-generation')
const {
  createUser, createDog, createDogWithImage, dog,
} = require('../helper/model-generation')


describe('the user routes', () => {
  beforeAll(async () => {
    await setUp()
  })

  afterAll(async () => {
    await tearDownConnection()
  })

  describe('When creating a user', () => {
    it('Should be able to create a user', async () => {
      const userProps = generateUserProps()
      const res = await request(server)
        .post(BASE_URL)
        .send(userProps)

      expect(res.status).toBe(200)
    })
  })

  describe('When searching for a users dogs', () => {
    let user
    beforeAll(async () => {
      user = await createUser()
      await createDog(user.id)
      await createDog(user.id)
    })

    it('Should be able to search for the users dogs', async () => {
      const { body } = await request(server)
        .get(`${BASE_URL}/${user.id}/dogs`)

      expect(body.dogs.length).toBe(2)
    })
  })

  describe('When adding dogs ', () => {
    it('should be able to save an image', async () => {
      const user = await createUser()
      const dogProps = generateDogPropsWithImage(user.id)
      const url = `${BASE_URL}/${user.id}/dogs`

      const { status, body } = await request(server)
        .post(url)
        .send(dogProps)

      expect(status).toBe(200)
      expect(body.dogs).toBeTruthy()
    })
  })

  describe('When adding a tag for an image', async () => {
    it('Should be able to update the tag', async () => {
      const dog = await createDog()
      const UPDATED_TAG = 'COOL DOG'
      const url = `${BASE_URL}/${dog.user_id}/dogs/${dog.id}/tags/${UPDATED_TAG}`

      const { status, body } = await request(server)
        .put(url)

      expect(status).toBe(200)
      expect(body.dogs.tag).toBe(UPDATED_TAG)
    })
  })

  describe('when getting an image', () => {
    let createdDog
    beforeAll(async () => {
      createdDog = await createDogWithImage()
    })

    const compareImageToResponse = async (url, image) => {
      const { status, body } = await request(server)
        .get(url)

      expect(status).toBe(200)
      expect(body.toString()).toBe(image)
    }

    const createUrl = (route, dog = createdDog) => `${BASE_URL}/${dog.userId}/dogs/${dog.id}/${route}/${dog.image.id}`

    it('Should be able to get an image', async () => {
      const url = createUrl('image')
      await compareImageToResponse(url, createdDog.image.image.toString())
    })

    it('Should be able to get a pin', async () => {
      const url = createUrl('pin')
      await compareImageToResponse(url, createdDog.image.pin.toString())
    })

    it('Should be able to get a thumbnail', async () => {
      const url = createUrl('thumbnail')
      await compareImageToResponse(url, createdDog.image.thumbnail.toString())
    })
  })
})
