//Imports all public actions from the actions directory
//Exports all public actions for other files to import

import {
    addDogs,
    findDogs,
    submitDog,
    addSingleDog,
} from "./dogsActions";

import {
    loginUser,
} from "./userActions"

import {
    setCameraPermission,
    setLocationPermission
} from "./permissionsActions"

export {
    addDogs,
    addSingleDog,
    findDogs,
    submitDog,
    loginUser,

    setCameraPermission,
    setLocationPermission,
}

