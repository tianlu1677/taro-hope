import {createAction} from '@/utils/redux'

import {
  USER_DETAIL,
  USER_UPDATE,
  CURRENT_USER_DETAIL,
  USER_FOLLOW,
  USER_UN_FOLLOW,
  TOPIC_DETAIL,
  TOPIC_LIKE,
  TOPIC_UN_LIKE,
  CURRENT_USER_MORE_INFO,
  CURRENT_USER_UNREAD_NOTIFICATION,
  TOPIC_SUGGESTIONS,

  ADD_SUGGESTION,
  EDIT_SUGGESTION,
  DELETE_SUGGESTION,
  UPDATE_SUGGESTION,
  INIT_SUGGESTION_LIST
}
  from '@/constants'

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

export const dispatchCurrentUserMoreInfo = options => createAction({
  url: '/api/v1/users/detail',
  type: CURRENT_USER_MORE_INFO,
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

export const dispatchUserMoreInfo = options => createAction({
  url: `/api/v1/users/${options.user_id}/more_info`,
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

// 心得
export const dispatchTopicDetail = options => createAction({
  url: `/api/v1/topics/${options.topic_id}`,
  type: TOPIC_DETAIL,
  data: options
})

// 心得下的todo
export const dispatchTopicDetailSuggestions = topic_id => createAction({
  url: `/api/v1/suggestions?topic_id=${topic_id}`,
  type: TOPIC_SUGGESTIONS,
  data: {}
})

export const dispatchLikeTopic = options => createAction({
  url: `/api/v1/likes`,
  type: TOPIC_LIKE,
  method: 'POST',
  data: options
})

export const dispatchUnLikeTopic = options => createAction({
  url: `/api/v1/likes/clear`,
  type: TOPIC_UN_LIKE,
  method: 'POST',
  data: options
})

export const dispatchUnFollowTopic = options => createAction({
  url: `/api/v1/users/${options.user_id}/unfollow`,
  type: USER_UN_FOLLOW,
  method: 'DELETE',
  options: options
})


export const dispatchUserUnReadNotification = options => createAction({
  url: `/api/v1/notifications/unread_count`,
  type: CURRENT_USER_UNREAD_NOTIFICATION,
  method: 'GET',
  data: options
})

export const dispatchInitSuggestions = options => createAction({
  url: `/api/v1/suggestions`,
  type: INIT_SUGGESTION_LIST,
  method: 'GET',
  data: options
})


// 增加清单列表
export const dispathAddSuggestion = baseSuggestion => {
  return {
    type: ADD_SUGGESTION,
    payload: baseSuggestion
  }
}

export const dispathEditSuggestion = (baseSuggestion, index) => {
  return {
    type: EDIT_SUGGESTION,
    payload: { baseSuggestion: baseSuggestion, index: index }
  }
}

export const dispathUpdateSuggestion = (baseSuggestion, index) => {
  return {
    type: UPDATE_SUGGESTION,
    payload: { baseSuggestion: baseSuggestion, index: index }
  }
}

export const dispathDeleteSuggestion = index => {
  return {
    type: DELETE_SUGGESTION,
    payload: {index: index }
  }
}

