//Imports all public actions from the actions directory
//Exports all public actions for other files to import

import {
    addDogs,
    findDogs
} from "./dogsActions";

import {
    tryLogin
} from "./userActions"

import {
    hasCameraPermission,
    hasLocationPermission
} from "./permissionsActions"

export {
    addDogs,
    findDogs,

    tryLogin,

    hasCameraPermission,
    hasLocationPermission,
}

//these are my functions that I need to work out where to put they are here after the merge conflicts
export const addSingleDog = dog => {
    return {
        type: ADD_SINGLE_DOG,
        dog: dog
    }
}

export const submitDog = (imageData) => {
    console.log(imageData)
    return async (dispatch) => {
        const {dogs} = await uploadDogPhoto(imageData)
            .catch(err => {
                console.log(err)
            })
        const addSingleDogAction = addSingleDog(dogs)
        dispatch(addSingleDogAction)
    }
}
