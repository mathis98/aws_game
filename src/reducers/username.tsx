import { receiveInitialData, SET_USERNAME } from "../actions";
import { getStateFromBackend } from "../BackendInteractor";
import store from "../store";

export interface UsernameAction {
  type: string;
  username: string;
}

const initialUsername = 'hmm';

const username = (state: string = initialUsername, action: UsernameAction) => {
  switch (action.type) {
    case SET_USERNAME:
      getStateFromBackend(action.username)
      // @ts-ignore
        .then(data => store.dispatch(receiveInitialData(data)));
      return action.username;
    default:
      return state;
  }
};

export default username;
