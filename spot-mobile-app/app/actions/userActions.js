import {login} from "../api/routes"
import {findDogs} from "./dogsActions";

import {
    SET_LOGGED_IN,
    SET_USER_DETAILS
} from "../consts/user";

export const _setUserAsLoggedIn = () => ({
    type: SET_LOGGED_IN
})

export const _setUserDetails = (userInfo) => ({
    type: SET_USER_DETAILS,
    userInfo
})

export const _loginUser = (userInfo) => {
    return dispatch => {
        dispatch(_setUserAsLoggedIn())
        dispatch(_setUserDetails(userInfo))
    }
}

export const tryLogin = () => {
    return async (dispatch) => {
        try {
            const userInfo = await login()
            dispatch(_loginUser(userInfo))
            dispatch(findDogs(userInfo.id))
        } catch (err) {
            console.log(err)
        }
    }
}
