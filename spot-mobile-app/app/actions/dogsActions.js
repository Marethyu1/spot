import {
    ADD_DOGS,
    ADD_SINGLE_DOG
} from "../consts/dogs";

import {findDogsForUser, login, uploadDogPhoto} from "../api/routes"

export const addDogs = dogs => {
    return {
        type: ADD_DOGS,
        dogs: dogs
    }
}

export const addSingleDog = dog => {
    return {
        type: ADD_SINGLE_DOG,
        dog: dog
    }
}

//TODO remove default user id
export const findDogs = (userId) => {
    return async (dispatch) => {
        const {dogs} = await findDogsForUser(userId)
            .catch(err => {
                debugger
            })
        const addDogsAction = addDogs(dogs)
        dispatch(addDogsAction)
    }
}

export const submitDog = (imageData, id) => {
    console.log(imageData)
    return async (dispatch) => {
        const {dogs} = await uploadDogPhoto(imageData, id)
            .catch(err => {
                console.log(err)
            })
        const addSingleDogAction = addSingleDog(dogs)
        dispatch(addSingleDogAction)
    }
}

