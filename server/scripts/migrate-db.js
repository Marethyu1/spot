const {setUp} = require("../src/db/database-manager")

setUp()
.then(() => {
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})
