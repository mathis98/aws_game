import { StateType } from "../store";
import { ScoreState } from "../reducers/score";

const apiUrl = "https://api.slsgame.janbe.eu/score";

export const getStateFromBackend = async (username: string): Promise<ScoreState> => {
  const resp = await fetch(apiUrl + "?user=" + username);
  return (await resp.json()).data;
};

export const saveStateToBackend = (state: StateType): void => {
  if (state.username) {
    fetch(apiUrl, {method: "POST", body: JSON.stringify({data: state})});
  }
};
