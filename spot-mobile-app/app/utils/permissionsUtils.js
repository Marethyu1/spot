import {Permissions} from "expo"
const GRANTED = "granted"

const _hasPermission = async (permission) => {
    const {status} = await Permissions.askAsync(permission)
    return status === GRANTED
}

export const hasCameraPermission = async () => {
    return await _hasPermission(Permissions.CAMERA)
}

export const hasLocationPermission = async () => {
    return await _hasPermission(Permissions.LOCATION)
}
