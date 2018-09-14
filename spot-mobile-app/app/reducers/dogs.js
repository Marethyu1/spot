import {
    ADD_DOGS
} from "../consts/dogs"


const dogs = (state = [], action) => {
    console.log('Reducing the dogs')
    // switch (action.type) {
    //     case ADD_DOGS:
    //         return [
    //             ...state,
    //             {
    //                 id: action.id,
    //                 text: action.text,
    //                 completed: false
    //             }
    //         ]
    //
    //     default:
    //         return state
    // }
}
​
export default dogs
