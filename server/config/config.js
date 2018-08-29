const localDB = {
    dialect: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: "example",
}

const config = {
    "development": {
        database: {
            ...localDB,
            database: "spot_dev"
        }
    },
    "test": {
        database: {
            ...localDB,
            database: "spot_test"
        }
    }
}

module.exports = config[process.env.NODE_ENV || "development"]
