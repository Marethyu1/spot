const faker = require("faker")

const image = require("../../test/helper/load-image")

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
        //image: fs.readFileSync(fileLocation)
    }
}

const generateDogPropsWithImage = (user_id) => {
    if (!user_id) throw new Error("Need user id to generate a dog")
    return {
        user_id: user_id,
        title: faker.commerce.productName(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        caption: faker.lorem.sentences(),
        image: {
            image: image
        }

    }
}

module.exports = {
    generateUserProps,
    generateDogProps,
    generateDogPropsWithImage
}
