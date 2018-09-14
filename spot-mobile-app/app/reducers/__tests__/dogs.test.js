import dogsReducer, {initialState} from "../dogs"
import {addDogs, findDogs} from "../../actions";

const reduceFromInitialState = (action) => dogsReducer(undefined, action)

describe("The dogs reducer", () => {

    it("Should have a simple initial state", () => {
        expect(reduceFromInitialState({})).toEqual(initialState)
    })


    it("Should be able to add a list of dogs", () => {
        const dog = {
            id: 1,
        }
        const dogsToUpdate = [dog]

        const action = addDogs(dogsToUpdate)
        const {dogs} = reduceFromInitialState(action)

        expect(dogs).toEqual(dogsToUpdate)
    })
})
