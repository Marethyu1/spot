const faker = require("faker")
const fs = require("fs")
const path = require("path")

const fileName = "logo.png"
const fileLocation = path.join(__dirname, "/../images/", fileName)


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
        image: fs.readFileSync(fileLocation)
    }
}

module.exports = {
    generateUserProps,
    generateDogProps,
    generateDogPropsWithImage
}
