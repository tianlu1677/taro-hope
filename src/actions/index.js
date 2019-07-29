import { createAction } from '@utils/redux'

/**
 * 列表
 * @param {*} payload
 */
export const dispatchTopicList = payload => createAction({
  url: '/api/v1/topics',
  type: 'TOPIC_LIST',
  payload: payload
})