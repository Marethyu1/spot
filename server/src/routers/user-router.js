const {jsonRouter} = require("./create-routers")
const router = jsonRouter()
const userController = require("../controllers/user.controller")

router.route("/")
    .post(userController.create)


module.exports = router
