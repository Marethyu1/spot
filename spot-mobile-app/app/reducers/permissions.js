import {HAS_CAMERA_PERMISSION, HAS_LOCATION_PERMISSION} from "../consts/permissions";

export const initialState = {
    hasCameraPermission: false,
    hasLocationPermission: false
}

const permissions = (state=initialState, action) => {
    switch (action.type) {
        case HAS_CAMERA_PERMISSION:
            return {
                ...state,
                hasCameraPermission: true
            }
        case HAS_LOCATION_PERMISSION:
            return {
                ...state,
                hasLocationPermission: true
            }
        default:
            return state
    }
}

export default permissions
