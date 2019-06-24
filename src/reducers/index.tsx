import { combineReducers } from 'redux';
import score from './score';
import username from "./username";

export default combineReducers({
  score, username
});
