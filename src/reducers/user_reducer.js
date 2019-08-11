import {CURRENT_USER_DETAIL, USER_DETAIL, USER_FOLLOW, USER_UN_FOLLOW, USER_UPDATE} from '@/constants'

const INITIAL_STATE = {
  currentUser: {},
  userDetail: {},
  userMeta: {},
}

export default function counter (state = INITIAL_STATE, action) {
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
        currentUser: action.payload.data.user
      }
    case USER_UPDATE:
     return {
       ...state,
       currentUser: action.payload.data.user
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
