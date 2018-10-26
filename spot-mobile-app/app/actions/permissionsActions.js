import { SET_CAMERA_PERMISSION, SET_LOCATION_PERMISSION } from '../consts/permissions';

export const setCameraPermission = (permission = true) => ({
  type: SET_CAMERA_PERMISSION,
  permission,
});

export const setLocationPermission = (permission = true) => ({
  type: SET_LOCATION_PERMISSION,
  permission,
});
