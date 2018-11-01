const sharp = require('sharp')
const path = require('path')

const PIN_LOCATION = path.join(__dirname, 'pin_new.png')

const preProcessImage = async (image) => {
  const IMAGE_SIZE = 150

  const roundedCorners = Buffer.from(
    `<svg><rect x="0" y="0" width="${IMAGE_SIZE}" height="${IMAGE_SIZE}" rx="300" ry="300"/></svg>`,
  )

  const thumbnail = await sharp(image)
    .resize(IMAGE_SIZE, IMAGE_SIZE)
    .overlayWith(roundedCorners, { cutout: true })
    .png()
    .toBuffer()


  const pin = await sharp(PIN_LOCATION)
    .overlayWith(thumbnail, { top: 20, left: 20 })
    .toBuffer()

  return {
    thumbnail,
    pin,
  }
}

module.exports = {
  preProcessImage,
}
