import reducers from "../reducers"
import thunk from "redux-thunk"
import {createStore, applyMiddleware} from "redux"
import { composeWithDevTools } from 'remote-redux-devtools';

let composeEnhancer = (fn) => fn

const middleWare = [thunk]

if (process.env.NODE_ENV === 'development'){
    const {logger} = require("redux-logger")
    middleWare.push(logger)
    composeEnhancer = composeWithDevTools({ realtime: true, port: 8000 });
}


export default createStore(
    reducers,
    composeEnhancer(
        applyMiddleware(...middleWare)
    )
)
