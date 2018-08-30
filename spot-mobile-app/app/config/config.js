const env = "development"


const config = {
    "development": {
        baseUrl: "http://192.168.1.15:3000/api/v1"
    }
}

export default config[env]
