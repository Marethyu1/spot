import {SET_CAMERA_PERMISSION, SET_LOCATION_PERMISSION} from "../consts/permissions";

export const initialState = {
    hasCameraPermission: false,
    hasLocationPermission: false
};

const permissions = (state=initialState, action) => {
    switch (action.type) {
        case SET_CAMERA_PERMISSION:
            return {
                ...state,
                hasCameraPermission: action.permission
            };
        case SET_LOCATION_PERMISSION:
            return {
                ...state,
                hasLocationPermission: action.permission
            };
        default:
            return state
    }
};

export default permissions
