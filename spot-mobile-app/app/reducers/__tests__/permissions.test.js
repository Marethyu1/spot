import permissionsReducer, {initialState} from "../permissions"
import {hasCameraPermission, hasLocationPermission} from "../../actions"

const reduceFromInitialState = (action) => permissionsReducer(undefined, action)

describe("The permissions reducer", () => {

    it("Should have a simple initial state", () => {
        expect(reduceFromInitialState({})).toEqual(initialState)
    })

    it("Should be able to enable camera permissions", () => {
        const action = hasCameraPermission()
        const state = reduceFromInitialState(action)
        expect(state.hasCameraPermission).toBe(true)
    })

    it("Should be able to enable the location permissions", () => {
        const action = hasLocationPermission()
        const state = reduceFromInitialState(action)
        expect(state.hasLocationPermission).toBe(true)
    })
})
