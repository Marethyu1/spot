const faker = require("faker")

const image = require("../../test/helper/load-image")
const base64Image = require("../../test/helper/load-base64-image")

const generateUserProps = () => {
    return {
        id: faker.random.number(),
        name: faker.name.findName(),
        email: faker.internet.email()
    }
}


const generateDogProps = (user_id) => {
    if (!user_id) throw new Error("Need user id to generate a dog")
    return {
        user_id: user_id,
        title: faker.commerce.productName(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        caption: faker.lorem.sentences(),
    }
}

const generateDogPropsWithImage = (user_id, base64=true) => {
    if (!user_id) throw new Error("Need user id to generate a dog")
    let imageToSave = base64 ? base64Image : image
    return {
        user_id: user_id,
        title: faker.commerce.productName(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        caption: faker.lorem.sentences(),
        image: {
            image: imageToSave,
            thumbnail: imageToSave,
            pin: imageToSave
        }

    }
}

module.exports = {
    generateUserProps,
    generateDogProps,
    generateDogPropsWithImage
}
