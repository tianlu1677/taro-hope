import {CURRENT_USER_DETAIL, CURRENT_USER_MORE_INFO, USER_DETAIL, USER_FOLLOW, USER_UN_FOLLOW, USER_UPDATE} from '@/constants'

const INITIAL_STATE = {
  currentUser: {},
  userDetail: {},
  userMeta: {},
}

export default function Reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload.data.user,
        userMeta: action.payload.data.meta,
      }
    case CURRENT_USER_DETAIL:
      return {
        ...state,
        currentUser: {...state.currentUser, ...action.payload.data.user}
      }
    case USER_UPDATE:
     return {
       ...state,
       currentUser: {...state.currentUser, ...action.payload.data.user}
     }
    case CURRENT_USER_MORE_INFO:
      let user = action.payload.data.user
      return {
        ...state,
        currentUser: {...state.currentUser, ...user}
      }
    case USER_FOLLOW:
    case USER_UN_FOLLOW:
      return {
        ...state,
        userMeta: {...state.userMeta, ...action.payload.data.meta },
      }
   default:
     return state
  }
}
