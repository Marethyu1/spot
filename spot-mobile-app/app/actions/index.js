import {
    ADD_DOGS
} from "../consts/dogs";

export const addDogs = dogs => {
    return {
        type: ADD_DOGS,
        dogs: dogs
    }
}
