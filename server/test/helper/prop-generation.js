const faker = require('faker')

const image = require('../../test/helper/load-image')
const base64Image = require('../../test/helper/load-base64-image')

const generateUserProps = () => ({
  id: faker.random.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
})

// [-43.475937, 172.549585] ->  [-43.475937, 172.709006]
// [-43.583304, 172.549585] -> [-43.583304, 172.709006]

const coordBounds = {
  yMin: 172.549585,
  yMax: 172.709006,
  xMin: -43.477371,
  xMax: -43.405937,
}

const generateDogProps = (userId) => {
  if (!userId) throw new Error('Need user id to generate a dog')
  const lng = coordBounds.yMin + (Math.random() * (coordBounds.yMax - coordBounds.yMin))
  const lat = coordBounds.xMin + (Math.random() * (coordBounds.xMax - coordBounds.xMin))
  return {
    userId,
    tag: faker.commerce.productName(),
    latitude: lat,
    longitude: lng,
    caption: faker.commerce.productName(),
  }
}

const generateDogPropsWithImage = (userId, base64 = true) => {
  if (!userId) throw new Error('Need user id to generate a dog')
  const imageToSave = base64 ? base64Image : image
  return {
    userId,
    tag: faker.commerce.productName(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    caption: faker.lorem.sentences(),
    image: {
      image: imageToSave,
      thumbnail: imageToSave,
      pin: imageToSave,
    },

  }
}

module.exports = {
  generateUserProps,
  generateDogProps,
  generateDogPropsWithImage,
}
