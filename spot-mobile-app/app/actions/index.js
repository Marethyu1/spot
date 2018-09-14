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
export const findDogs = (userId="10210259641485879") => {
    return async (dispatch) => {
        console.log("fething some doggos!!!!!")
        const {dogs} = await findDogsForUser(userId)
            .catch(err => {
                debugger
            })
        debugger
        const addDogsAction = addDogs(dogs)
        dispatch(addDogsAction)
    }
}
