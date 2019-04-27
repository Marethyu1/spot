import server from "./server"

const NODE_ENV = process.env.NODE_ENV || 'development'

server.listen(3000, () => {
    console.log(`app running in ${NODE_ENV} on port 3000`)
});
