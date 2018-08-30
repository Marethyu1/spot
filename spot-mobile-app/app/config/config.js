const env = "development"


const config = {
    "development": {
        base_url: "http://192.168.1.15:3000/api/v1"
    }
}

export default config[env]
