import _ from 'lodash'
import store from '../store'

import config from '../config/config'

const BASE_URL = config.baseUrl

export const createImageUrl = options => _createAnyImageUrl(options)

export const createPinUrl = options => _createAnyImageUrl(options, 'pin')

export const createThumbnailUrl = options => _createAnyImageUrl(options, 'thumbnail')

const _createAnyImageUrl = ({ id, image_id }, path = 'image') => {
  if (!store) return undefined
  const state = store.getState()
  const userId = _.get(state, 'user.userInfo.id')
  if (!userId) return undefined // throw new Error("Cannot find user id")
  return `${BASE_URL}/users/${userId}/dogs/${id}/${path}/${image_id}`
}
