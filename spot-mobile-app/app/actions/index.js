import {
    ADD_DOGS
} from "../consts/dogs";

import {findDogsForUser} from "../api/routes"

export const addDogs = dogs => {
    return {
        type: ADD_DOGS,
        dogs: dogs
    }
}

//TODO remove default user id
export const findDogs = (userId="242029906422575") => {
    return async (dispatch) => {
        const dogs = await findDogsForUser(userId)
        const addDogsAction = addDogs(dogs)
        dispatch(addDogsAction)
    }
}
