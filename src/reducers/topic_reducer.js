import {
  TOPIC_DETAIL,
  TOPIC_FOLLOW,
  TOPIC_UN_FOLLOW,
  TOPIC_FOLLOW_USER,
  TOPIC_UN_FOLLOW_USER,
  TOPIC_LIKE,
  TOPIC_UN_LIKE,
  TOPIC_SUGGESTIONS,
} from '@/constants'

const INITIAL_STATE = {
  topicDetail: {user: {}, medias: [], ability: {}},
  topicMeta: {liked: false, followed_user: false},
  topicSuggestions: [],
}

export default function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOPIC_DETAIL:
      return {
        ...state,
        topicDetail: action.payload.data.topic,
        topicMeta: action.payload.data.meta
      }
    case TOPIC_FOLLOW_USER:
      return {
        ...state,
        topicMeta: {...state.topicMeta, followed_user: true}
      }
    case TOPIC_UN_FOLLOW_USER:
      return {
        ...state,
        topicMeta: {...state.topicMeta, followed_user: false}
      }
    case TOPIC_LIKE:
      return {
        ...state,
        topicMeta: {...state.topicMeta, liked: true}
      }
    case TOPIC_UN_LIKE:
      return {
        ...state,
        topicMeta: {...state.topicMeta, liked: false}
      }
    case TOPIC_SUGGESTIONS:
      return {
        ...state,
        topicSuggestions: action.payload.data.suggestions
      }
    default:
      return state
  }
}
