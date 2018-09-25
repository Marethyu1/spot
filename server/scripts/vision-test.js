// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
const image = require("../test/helper/load-base64-image")

const fs = require("fs")
const path = require("path")
const dir = path.join(__dirname + "/../../images/golden-dog.jpg")
const bitmap = fs.readFileSync(dir)

const encodedImage = new Buffer(bitmap)




// Performs label detection on the image file
client
    .labelDetection(encodedImage)
    .then(results => {
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach(label => console.log(label.description));
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
