import Expo from 'expo'
import config from '../config/config'


import { get, post, put } from './apiMethods'

const { baseUrl } = config

const createUrl = route => `${baseUrl}/${route}`

const getFacebookUserInfo = token => get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`)

const facebookLogin = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('242029906422575', {
    permissions: ['public_profile', 'email'],
  })
  if (type !== 'success') {
    throw new Error('couldnt log in properly')
  } else {
    return token
  }
}

// private
const _createUser = async (body) => {
  const url = createUrl('users')
  return post(url, body)
}

export const login = async () => {
  try {
    const token = await facebookLogin()
    const userInfo = await getFacebookUserInfo(token)
    return await _createUser(userInfo)
  } catch (err) {
    console.log(err)
    return false
  }
}


export const findDogsForUser = (userId) => {
  const url = createUrl(`users/${userId}/dogs`)
  return get(url)
}

export const uploadDogPhoto = (photoData, userId) => {
  const url = createUrl(`users/${userId}/dogs`)
  return post(url, photoData)
}

export const updateDogTag = (userId, dogId, tag) => {
  const url = createUrl(`users/${userId}/dogs/${dogId}/tags/${tag}`)
  return put(url)
}
