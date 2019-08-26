import {CURRENT_USER_DETAIL, CURRENT_USER_MORE_INFO, USER_DETAIL, USER_FOLLOW, USER_UN_FOLLOW, USER_UPDATE, CURRENT_USER_UNREAD_NOTIFICATION} from '@/constants'

const INITIAL_STATE = {
  currentUser: {},
  userDetail: {},
  userMeta: {},
  unreadNotification: 0
}

export default function Reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        userDetail: {...state.userDetail, ...action.payload.data.user},
        userMeta: { ...state.userMeta, ...action.payload.data.meta }
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
    case CURRENT_USER_UNREAD_NOTIFICATION:
      return {
        ...state,
        unreadNotification: action.payload.data.count
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
