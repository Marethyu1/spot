import config from "../config/config"

const baseUrl = config.baseUrl

const createUrl = (route) => `${baseUrl}/${route}`

const toJson = (x) => x.json()

export const login = async () => {
   try {
       const token = await facebookLogin()
       const userInfo = await getFacebookUserInfo(token)
       debugger
       const createdUser = await createUser(userInfo)
       return createdUser
   } catch (err) {
       console.log(err)
   }
}

const getFacebookUserInfo = (token) => {
    return fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`)
        .then(toJson)
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

    return await fetch(url,
        {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        }
    ).then(toJson)
}
