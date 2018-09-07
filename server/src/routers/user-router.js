const {jsonRouter} = require("./create-routers")
const router = jsonRouter()
const userController = require("../controllers/user.controller")

// TODO if another router is created, move this into its own file
const wrap = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}

router.route("/")
    .post(wrap(userController.create))

router.route("/:user_id/dogs")
    .get(wrap(userController.findDogs))
    .post(wrap(userController.createDog))


module.exports = router
