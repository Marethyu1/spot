import {ADD_DOGS, ADD_SINGLE_DOG} from "../consts/dogs";

export const initialState = {
    dogs: []
}

const dogs = (state=initialState, action) => {
    switch (action.type) {
        case ADD_DOGS:
            return {
                ...state,
                dogs: [...state.dogs, ...action.dogs]
            }
        case ADD_SINGLE_DOG:
            return {
                ...state,
                dogs: [...state.dog, ...action.dog]
            }
        default:
            return state

    }
}

export default dogs
