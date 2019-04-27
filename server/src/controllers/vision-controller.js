const { ImageAnnotatorClient } = require('@google-cloud/vision')

let client = null

const _getLabels = (response) => {
  const labels = response[0].labelAnnotations
  return labels.map(x => x.description)
}

const _getTags = async (image) => {
  try {
    return await client.labelDetection(image)
      .then(_getLabels)
  } catch (err) {
    console.log('Error finding tags... ')
    console.log(err)
    return []
  }
}

const getTagsPolyfill = async (image) => {
  const faker = require('faker')
  const labels = ['Dog',
    'Dog Like Mammal',
    'Dog Breed',
    'Dog Breed Group',
    'Menswear Dog',
    'Snout',
    'Product',
    'Puppy',
    'Companion Dog',
    'Carnivoran']
  for (let i = 0; i < 10; i++) {
    // labels.push(faker.commerce.productName())
  }
  return labels
}

const polyFillGetTags = () => {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log('GOOGLE_APPLICATION_CREDENTIALS not set, getting tags may return unexpected results')
    return getTagsPolyfill
  }
  if (!client) {
    client = new ImageAnnotatorClient()
  }
  return _getTags
}

module.exports = {
  getTags: polyFillGetTags(),
}
