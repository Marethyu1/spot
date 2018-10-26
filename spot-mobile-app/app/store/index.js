import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import reducers from '../reducers'
const { logger } = require('redux-logger')


let composeEnhancer = fn => fn

const middleWare = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleWare.push(logger)
  composeEnhancer = composeWithDevTools({ realtime: true, port: 8000 })
}


export default createStore(
  reducers,
  composeEnhancer(
    applyMiddleware(...middleWare),
  ),
)
