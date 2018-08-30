const NODE_ENV = process.env.NODE_ENV || "development"
const app = require("./server")
const {getDatabase, setUp} = require("./src/db/database-manager")

getDatabase()


app.listen(3000, () => {
    console.log(`app running in ${NODE_ENV} on port 3000`)
})
