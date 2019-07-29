import { ACCOUNT_DETAIL, ACCOUNT_UPDATE } from '@/constants'

const INITIAL_STATE = {
  currentAccount: {}
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACCOUNT_DETAIL:
      return {
        ...state,
        currentAccount: action.account
      }
     case ACCOUNT_UPDATE:
       return {
         ...state,
         currentAccount: action.account
       }
     default:
       return state
  }
}
