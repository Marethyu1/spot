import {
    SET_DOGS,
    ADD_SINGLE_DOG,
    SET_CURRENT_DOG, UPDATE_SINGLE_DOG
} from "../consts/dogs";

import {findDogsForUser, uploadDogPhoto, updateDogTag} from "../api/routes"

export const addDogs = dogs => {
    return {
        type: SET_DOGS,
        dogs: dogs
    }
}

export const addSingleDog = dog => {
    return {
        type: ADD_SINGLE_DOG,
        dog: dog
    }
}

export const updateSingleDog = dog => {
    return {
        type: UPDATE_SINGLE_DOG,
        dog: dog,
    }
}

export const setCurrentDog = dog => {
    return {
        type: SET_CURRENT_DOG,
        currentDog: dog,
    }
}

export const findDogs = (userId) => {
    return async (dispatch) => {
        const {dogs} = await findDogsForUser(userId)
        const addDogsAction = addDogs(dogs)
        dispatch(addDogsAction)
    }
}

// Saves a dog to the api, adds the created dog to the list of dogs, and also sets it to be the current dog
// This means we can access dogs.currentDog.tags to find the tags recommended by the api
export const submitDog = (imageData, id) => {
    return async (dispatch) => {
        const {dogs} = await uploadDogPhoto(imageData, id)
        const addSingleDogAction = addSingleDog(dogs)
        const setCurrentDogAction = setCurrentDog(dogs)
        dispatch(addSingleDogAction)
        dispatch(setCurrentDogAction)
    }
}

// Updates the tag for a dog, after updating it clears the current dog in state (dogs.currentDog)
export const updateDogTagAndClearCurrent = (userId, dogId, tag) => {
    return async (dispatch) => {
        const {dogs} = await updateDogTag(userId, dogId, tag)
        const updateSingledDogAction = updateSingleDog(dogs)
        const clearCurrentDogAction = setCurrentDog({})
        dispatch(updateSingledDogAction)
        dispatch(clearCurrentDogAction)
    }
}

