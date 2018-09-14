import {ADD_DOGS} from "../consts/dogs";

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
        default:
            return state
    }
}

export default dogs
