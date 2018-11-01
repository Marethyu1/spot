const userModel = require('../models/user-model')
const dogsModel = require('../models/dogs-model')
const imagesModel = require('../models/images-model')
const { getTags } = require('./vision-controller')


const create = async (req, res, next) => {
  try {
    const model = await userModel.upsert(req.body)
      .catch((err) => {
        console.log('Error oh no!')
        res.status(500).send(err)
      })
    if (model) {
      res.send(model.toJSON())
    } else {
      res.status(500).send('Oh dear')
    }
  } catch (err) {
    res.status(500).send('Oh dear')
  }
}


const findDogs = async (req, res) => {
  const { user_id } = req.params
  const dogs = await dogsModel.findDogsForUser(user_id)
  const body = {
    dogs: dogs.map(x => x.toJSON()),
  }
  res.send(body)
}

const createDog = async (req, res) => {
  const { user_id } = req.params
  const options = {
    user_id,
    ...req.body,
    ...req.body.geocode,
  }
  const image = new Buffer(options.image.image.toString(), 'base64')

  const tags = await getTags(image)
    .catch((err) => {
      console.log(err)
      return []
    })

  options.image.image = image
  const dog = await dogsModel.create(options)
  const body = {
    dogs:
            {
              ...dog.toJSON(),
              tags,
            },
  }
  delete body.dogs.image
  res.send(body)
}

const findImage = async (req, res, next) => {
  const { image_id } = req.params
  const imageType = req.params[0] // The regex indexed by 0

  const DEFAULT_IMAGE_TYPE = 'image'
  const expectedImageTypes = {
    image: 'image',
    pin: 'pin',
    thumbnail: 'thumbnail',
  }
  // Check if the route matches a potential image type
  const imageTypeToSearch = expectedImageTypes[imageType] ? imageType : DEFAULT_IMAGE_TYPE

  const image = await imagesModel.get(image_id, imageTypeToSearch)

  const binary = image[imageTypeToSearch]

  res.send(binary)
}

const updateDogTag = async (req, res, next) => {
  const { user_id, dog_id, tag } = req.params
  const updatedDog = await dogsModel.updateTag(user_id, dog_id, tag.toString())
  const body = {
    dogs: updatedDog.toJSON(),
  }
  res.send(body)
}


module.exports = {
  create,
  findDogs,
  createDog,
  findImage,
  updateDogTag,
}
