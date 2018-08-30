const faker = require("faker")


const generateUserProps = () => {
    return {
        id: faker.random.number(),
        name: faker.name.findName(),
        email: faker.internet.email()
    }
}

module.exports = {
    generateUserProps,
}
