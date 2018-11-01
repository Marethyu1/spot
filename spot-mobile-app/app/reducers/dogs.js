import {
  SET_DOGS, ADD_SINGLE_DOG, SET_CURRENT_DOG, UPDATE_SINGLE_DOG,
} from '../consts/dogs'

export const initialState = {
  dogs: [],
  currentDog: {},
}

const dogs = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOGS:
      return {
        ...state,
        dogs: [...action.dogs].reverse(),
      }
    case ADD_SINGLE_DOG:
      return {
        ...state,
        dogs: [action.dog, ...state.dogs],
      }
    case UPDATE_SINGLE_DOG: {
      const dogId = action.dog.id
      const updatedDogs = [...state.dogs].map((dog) => {
        if (dog.id === dogId) return action.dog
        return dog
      })
      return {
        ...state,
        dogs: updatedDogs,
      }
    }
    case SET_CURRENT_DOG:
      return {
        ...state,
        currentDog: action.currentDog,
      }
    default:
      return state
  }
}

export default dogs
