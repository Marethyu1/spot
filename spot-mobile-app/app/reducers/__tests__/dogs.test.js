import dogsReducer, {initialState} from "../dogs"
import {addDogs, addSingleDog} from "../../actions";

const reduceFromInitialState = (action) => dogsReducer(undefined, action)

const reduceFromExistingState = (action) => dogsReducer({dogs: [{id: 1}, {id: 2}, {id:3}]}, action)

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

    it("Should be able to add a single dog", () => {
        const dog = {
            id: 1,
        }
        const dogsToUpdate = [dog]

        const action = addSingleDog(dog)
        const {dogs} = reduceFromInitialState(action)

        expect(dogs).toEqual(dogsToUpdate)
    })

    it("Should be able to add a single dog to a list of already created dogs", () => {
        const dog = {
            id: 4,
        };
        const dogsToUpdate = [{id: 1}, {id: 2}, {id:3}, dog]

        const action = addSingleDog(dog)
        const {dogs} = reduceFromExistingState(action)

        expect(dogs).toEqual(dogsToUpdate)
    })

})
