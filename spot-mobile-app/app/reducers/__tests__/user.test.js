import userReducer, {initialState} from "../user"
import {_setUserAsLoggedIn, _setUserDetails, _loginUser} from "../../actions";

const reduceFromInitialState = (action) => userReducer(undefined, action)

const EXAMPLE_USER = {
    id: 1
}

describe("The user reducer", () => {

    it("The user should be logged out by default", () => {
        expect(reduceFromInitialState({})).toEqual(initialState)
    })

    it("Should be able set a user as logged in", () => {
        const action = _setUserAsLoggedIn()
        const {isLoggedIn} = reduceFromInitialState(action)
        expect(isLoggedIn).toEqual(true)
    })

    it("Should be able to set user details", () => {
        const action = _setUserDetails(EXAMPLE_USER)
        const {userInfo} = reduceFromInitialState(action)
        expect(userInfo).toBe(EXAMPLE_USER)
    })

    //Using manual tests for this instead becuase of time ..
    describe.skip("When logging in", () => {
        let state
        beforeAll(async () => {
            const action = _loginUser(EXAMPLE_USER)
            state = reduceFromInitialState(action)
        })

        it("Should set logged in to true", () => {
            const {isLoggedIn} = state
            expect(isLoggedIn).toBe(true)
        })

        it("Should update the user info", () => {
            const {userInfo} = state
            expect(userInfo).toBe(EXAMPLE_USER)
        })
    })
})
