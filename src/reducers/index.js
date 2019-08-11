import { combineReducers } from 'redux'
import user_reducer from './user_reducer';
import topic_reducer from './topic_reducer';

export default combineReducers({
  user: user_reducer,
  topic: topic_reducer
})
