import { StateType } from "../store";
import { ScoreState } from "../reducers/score";

const apiUrl = "https://api.slsgame.janbe.eu/score";

export const getStateFromBackend = async (username: string): Promise<ScoreState> => {
  const resp = await fetch(apiUrl + "?user=" + username);
  return (await resp.json()).data;
};

export const saveStateToBackend = (state: StateType): void => {
  if (state.username) {
    // This is a really quick and dirty solution
    // It might break the savegame under some specific conditions:
    // If
    // - the lambda takes more than 300 ms, which is the case like 2% of the time
    // - a reoccurring user logs back in
    // - and the post function finishes sooner than the post, which is around 50% of the time
    //
    // So if it happens to you... well sorry, but amazon took too long
    setTimeout(() => {
      fetch(apiUrl, {method: "POST", body: JSON.stringify({data: state})});
    }, 300);

  }
};
