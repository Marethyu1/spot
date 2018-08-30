import config from "../config/config"

const baseUrl = config.baseUrl

const createUrl = (route) => `${baseUrl}/${route}`

import {get, post, put} from "./apiMethods"

export const login = async () => {
   try {
       const token = await facebookLogin()
       const userInfo = await getFacebookUserInfo(token)
       const createdUser = await createUser(userInfo)
       return createdUser
   } catch (err) {
       console.log(err)
   }
}

const getFacebookUserInfo = (token) => {
    return get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`)
}



const facebookLogin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('242029906422575', {
        permissions: ['public_profile', "email"],
    })
    if (type !== "success"){
        throw new Error("couldnt log in properly")
    } else {
        return token
    }
}

//private
const createUser = async (body) => {
    const url = createUrl("users")
    return await post(url, body)
}
