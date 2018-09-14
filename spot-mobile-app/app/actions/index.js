import {
    ADD_DOGS,
    ADD_SINGLE_DOG
} from "../consts/dogs";

import {findDogsForUser, uploadDogPhoto} from "../api/routes"

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
export const findDogs = (userId="10210259641485879") => {
    return async (dispatch) => {
        console.log("fething some doggos!!!!!")
        const {dogs} = await findDogsForUser(userId)
            .catch(err => {

            })

        const addDogsAction = addDogs(dogs)
        dispatch(addDogsAction)
    }
}

export const submitDog = (imageData) => {
    debugger
    console.log(imageData)
    return async (dispatch) => {
        const {dog} = await uploadDogPhoto(imageData)
            .catch(err => {
                debugger
            })
        debugger
        const addSingleDogAction = addSingleDog(dog)
        dispatch(addSingleDogAction)
    }
}
