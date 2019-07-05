import { receiveInitialData, SET_USERNAME } from "../actions";
import { getStateFromBackend } from "../Storage/BackendStorage";
import store from "../store";

export interface UsernameAction {
  type: string;
  username: string;
}

const initialUsername = '';

const username = (state: string = initialUsername, action: UsernameAction) => {
  switch (action.type) {
    case SET_USERNAME:
      if (action.username) {
        getStateFromBackend(action.username)
          .then(data => store.dispatch(receiveInitialData(data)));
      }
      return action.username;
    default:
      return state;
  }
};

export default username;
