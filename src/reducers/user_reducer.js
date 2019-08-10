import {CURRENT_USER_DETAIL, USER_DETAIL, USER_UPDATE} from '@/constants'

const INITIAL_STATE = {
  currentUser: {},
  userDetail: {},
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        userDetail: action.user
      }
    case CURRENT_USER_DETAIL:
      return {
        ...state,
        userDetail: action.user
      }
    case USER_UPDATE:
     return {
       ...state,
       currentUser: action.user
     }
   default:
     return state
  }
}
