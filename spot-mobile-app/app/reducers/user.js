import { SET_LOGGED_IN, SET_USER_DETAILS } from '../consts/user'

let _initialState = {
  isLoggedIn: false,
  userInfo: {},
}

if (process && process.env.NODE_ENV === 'development') {
  _initialState = {
    userInfo: {
      id: '',
    },
  }
}

export const initialState = _initialState


const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
      }
    case SET_USER_DETAILS:
      return {
        ...state,
        userInfo: action.userInfo,
      }
    default:
      return state
  }
}

export default user
