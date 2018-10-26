import {
  SET_USER_DETAILS,
  LOG_OUT,
} from '../consts/user';

export const loginUser = userInfo => ({
  type: SET_USER_DETAILS,
  userInfo,
});

export const logoutUser = () => ({
  type: LOG_OUT,
});
