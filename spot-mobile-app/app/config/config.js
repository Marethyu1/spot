import IP_ADDRESS from './ipaddress'

const env = 'development'


const config = {
  development: {
    baseUrl: `http://${IP_ADDRESS}:3000/api/v1`,
  },
}

export default config[env]
