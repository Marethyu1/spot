const env = "development"
import IP_ADDRESS from "./ipaddress"


const config = {
    "development": {
        baseUrl: `http://${IP_ADDRESS}:3000/api/v1`
    }
}

export default config[env]
