import { Permissions } from 'expo'

const GRANTED = 'granted'

const _hasPermission = async (permission) => {
  const { status } = await Permissions.askAsync(permission)
  return status === GRANTED
}

export const hasCameraPermission = async () => await _hasPermission(Permissions.CAMERA)

export const hasLocationPermission = async () => await _hasPermission(Permissions.LOCATION)
