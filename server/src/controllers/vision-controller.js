const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const _getLabels = (response) => {
    const labels = response[0].labelAnnotations
    return labels.map(x => x.description)
}

const getTags = async (image) => {
    try {
        const results = await client.labelDetection(image)
            .then(_getLabels)
        return results
    } catch (err) {
        console.log("Error finding tags... ")
        console.log(err)
        return []
    }
}

const getTagsPolyfill = async (image) => {
    const faker = require("faker")
    let labels = []
    for (let i=0; i<10; i++){
        labels.push(faker.commerce.productName())
    }
    return labels
}

const polyFillGetTags = () => {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.log("GOOGLE_APPLICATION_CREDENTIALS not set, getting tags may return unexpected results")
        return getTagsPolyfill
    } else {
        return getTags
    }
}

module.exports = {
    getTags: polyFillGetTags()
}
