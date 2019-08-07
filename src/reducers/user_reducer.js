import { USER_DETAIL, USER_UPDATE } from '@/constants'

const INITIAL_STATE = {
  currentUser: {}
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        currentUser: action.user
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
