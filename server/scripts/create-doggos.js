const fs = require("fs")
const path = require("path")
const USER_ID = "10210259641485879"

const {createDogLoadImage} =require("../test/helper/model-generation")

function loadImages(){
    const IMAGE_DIR = path.join(__dirname, "images")
    const imageLocations = fs.readdirSync(IMAGE_DIR)
    const images = imageLocations.map(x => {
        const imageLocation = path.join(IMAGE_DIR, x)
        return fs.readFileSync(imageLocation)
    })
    return images
}

async function createDogs(user_id, images) {
    const promises = images.map(image => {
        return createDogLoadImage(user_id, image)
    })
    return Promise.all(promises)
}

function main(){
    const images = loadImages()
    return createDogs(USER_ID, images)
}

main().then(() => process.exit(0))
