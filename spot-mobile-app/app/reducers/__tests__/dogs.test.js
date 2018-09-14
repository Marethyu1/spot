import dogsReducer from "../dogs"
import {addDogs} from "../../actions";

describe("The dogs reducer", () => {
    const initialState = []
    it("Should have a simple initial state", () => {
        expect(dogsReducer(undefined, {})).toEqual(initialState)
    })
})
