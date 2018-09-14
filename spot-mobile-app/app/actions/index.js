import {
    ADD_DOGS
} from "../consts/dogs";

import {findDogsForUser, login} from "../api/routes"

export const addDogs = dogs => {
    return {
        type: ADD_DOGS,
        dogs: dogs
    }
}

//TODO remove default user id
export const findDogs = (userId="10210259641485879") => {
    return async (dispatch) => {
        const {dogs} = await findDogsForUser(userId)
            .catch(err => {
                debugger
            })
        const addDogsAction = addDogs(dogs)
        dispatch(addDogsAction)
    }
}

import {
    SET_LOGGED_IN,
    SET_USER_DETAILS
} from "../consts/user";
import user from "../reducers/user";

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


