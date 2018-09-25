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

module.exports = {
    getTags
}
