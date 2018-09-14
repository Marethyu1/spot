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
