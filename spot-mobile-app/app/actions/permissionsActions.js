import {SET_CAMERA_PERMISSION, SET_LOCATION_PERMISSION} from "../consts/permissions"

export const setCameraPermission = (permission=true) => {
    return ({
        type: SET_CAMERA_PERMISSION,
        permission: permission
    })
}

export const setLocationPermission = (permission=true) => {
    return ({
        type: SET_LOCATION_PERMISSION,
        permission: permission
    })
}
