import { combineReducers } from 'redux'
import account_reducer from './account_reducer';

export default combineReducers({  
  account: account_reducer
})
