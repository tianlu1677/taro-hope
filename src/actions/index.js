import { createAction } from '@/utils/redux'

import { USER_DETAIL, USER_UPDATE, CURRENT_USER_DETAIL } from '@/constants'
/**
 * 列表
 * @param {*} payload
 */
export const dispatchTopicList = payload => createAction({
  url: '/api/v1/topics',
  type: 'TOPIC_LIST',
  payload: payload
})

export const dispatchCurrentUser = payload => createAction({
  url: '/api/v1/users/me',
  type: CURRENT_USER_DETAIL,
  payload: payload
})

export const dispatchUserDetail = payload => createAction({
  url: `/api/v1/users/${payload.user_id}`,
  type: USER_DETAIL,
  payload: payload
})
