import { createAction } from '@/utils/redux'

import { USER_DETAIL, USER_UPDATE, CURRENT_USER_DETAIL, USER_FOLLOW, USER_UN_FOLLOW } from '@/constants'
/**
 * 列表
 * @param {*} options
 */
export const dispatchTopicList = options => createAction({
  url: '/api/v1/topics',
  type: 'TOPIC_LIST',
  options: options
})

export const dispatchCurrentUser = options => createAction({
  url: '/api/v1/users/me',
  type: CURRENT_USER_DETAIL,
  options: options
})

export const dispatchUpdateCurrentUser = options => createAction({
  url: '/api/v1/users/update_info',
  method: 'POST',
  type: CURRENT_USER_DETAIL,
  data: options
})

export const dispatchUserDetail = options => createAction({
  url: `/api/v1/users/${options.user_id}`,
  type: USER_DETAIL,
  data: options
})


export const dispatchFollowUser = options => createAction({
  url: `/api/v1/users/${options.user_id}/follow`,
  type: USER_FOLLOW,
  method: 'POST',
  options: options
})


export const dispatchUnFollowUser = options => createAction({
  url: `/api/v1/users/${options.user_id}/unfollow`,
  type: USER_UN_FOLLOW,
  method: 'POST',
  options: options
})
