import reducers from "../reducers"
import thunk from "redux-thunk"
import {createStore, applyMiddleware} from "redux"

const middleWare = [thunk]

if (process.env.NODE_ENV === 'development'){
    const {logger} = require("redux-logger")
    middleWare.push(logger)
}

export default createStore(
    reducers,
    applyMiddleware(...middleWare)
)
