const {jsonRouter} = require("./create-routers")
const router = jsonRouter()
const userController = require("../controllers/user.controller")

const bodyParser = require('body-parser')
const rawParser = bodyParser.raw({type: 'image/*', limit: '10000mb'})

// TODO if another router is created, move this into its own file
const wrap = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            console.log(err)
            console.log(err.message)
            res.status(500).send(err.message)
        }
    }
}

router.route("/")
    .post(wrap(userController.create))

router.route("/:user_id/dogs")
    .get(wrap(userController.findDogs))
    .post(rawParser, wrap(userController.createDog))

router.route("/:user_id/dogs/:dog_id/*/:image_id")
    .get(wrap(userController.findImage))


module.exports = router
