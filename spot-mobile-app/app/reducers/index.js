import {combineReducers} from "redux"
import dogs from "./dogs"
import user from "./user"

export default combineReducers({
    dogs,
    user
})
