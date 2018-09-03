const faker = require("faker")


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
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude()
    }
}

module.exports = {
    generateUserProps,
    generateDogProps
}
