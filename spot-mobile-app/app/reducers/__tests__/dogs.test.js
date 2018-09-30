import dogsReducer, {initialState} from "../dogs"
import {addDogs, addSingleDog, setCurrentDog} from "../../actions";
import {updateSingleDog} from "../../actions/dogsActions";

const reduceFromInitialState = (action) => dogsReducer(undefined, action)

const reduceFromExistingState = (action, dogs=[{id: 1}, {id: 2}, {id:3}]) => dogsReducer({dogs: dogs}, action)

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

    it("Should replace existing dogs when adding", () => {
        const dogsToUpdate = [{id: 1}, {id: 2}, {id:3}]

        const action = addDogs(dogsToUpdate)
        const {dogs} = reduceFromExistingState(action)
        const orderDogs = dogsToUpdate.reverse()
        expect(dogs).toEqual(orderDogs)
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
        const originalDogs = [{id: 1}, {id: 2}, {id:3}]

        const action = addSingleDog(dog)
        const {dogs} = reduceFromExistingState(action, originalDogs)

        const expectedDogs = [dog, ...originalDogs]
        expect(dogs).toEqual(expectedDogs)
    })

    it("Should be able to update a dog in the list of dogs", () => {
        const dog = {
            id: 1,
            tag: "NEW TAG"
        }

        const action = updateSingleDog(dog)
        const {dogs} = reduceFromExistingState(action)
        const foundDog = dogs.find(x => x.id === dog.id)

        expect(foundDog.tag).toBe(dog.tag)
    })

    it("Should be able to set the current dog", () => {
        const dog = {
            id: 4,
        }
        const action = setCurrentDog(dog)
        const {currentDog} = reduceFromInitialState(action)
        expect(currentDog).toEqual(dog)
    })

})
