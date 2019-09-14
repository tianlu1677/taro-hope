import {
  TOPIC_DETAIL,
  TOPIC_FOLLOW,
  TOPIC_UN_FOLLOW,
  TOPIC_FOLLOW_USER,
  TOPIC_UN_FOLLOW_USER,
  TOPIC_LIKE,
  TOPIC_UN_LIKE,
  TOPIC_SUGGESTIONS,

  ADD_SUGGESTION,
  EDIT_SUGGESTION,
  DELETE_SUGGESTION,
  INIT_SUGGESTION_LIST,
  UPDATE_SUGGESTION,
} from '@/constants'

const INITIAL_STATE = {
  topicDetail: {user: {}, medias: [], ability: {}},
  topicMeta: {liked: false, followed_user: false},
  topicSuggestions: [],
  editSuggestionList: [],
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
    case INIT_SUGGESTION_LIST:
      return {
        ...state,
        editSuggestionList: action.payload.data.suggestions
      }

    case ADD_SUGGESTION:
      return {
        ...state,
        editSuggestionList:  state.editSuggestionList.concat([action.payload])
      }

    case EDIT_SUGGESTION:
      return {
        ...state,
        editSuggestionList:  state.editSuggestionList.map((sug, sug_index) => (action.payload.index === sug_index ?  { ...sug, ...action.payload.baseSuggestion} : sug)) //editSuggestion(state.editSuggestionList, action.payload.index, action.payload.baseSuggestion)
      }

    case DELETE_SUGGESTION: {
      return {
        ...state,
        editSuggestionList: state.editSuggestionList.filter((sug, sug_index) => (sug_index !== action.payload.index))
      }
    }
    default:
      return state
  }
}


function editSuggestion(suggestions = [], index, suggestion) {
  suggestions.map((sug, sug_index) => {
    return sug_index === index ? { ...sug, ...suggestion} : sug
  })
}
