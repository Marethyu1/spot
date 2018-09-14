import {HAS_CAMERA_PERMISSION, HAS_LOCATION_PERMISSION} from "../consts/permissions";

export const hasCameraPermission = () => ({
    type: HAS_CAMERA_PERMISSION
})

export const hasLocationPermission = () => ({
    type: HAS_LOCATION_PERMISSION
})
