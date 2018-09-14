import {combineReducers} from "redux"
import dogs from "./dogs"
import user from "./user"
import permissions from "./permissions"

export default combineReducers({
    dogs,
    user,
    permissions,
})
