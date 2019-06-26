import * as api from "./BackendStorage";
import * as localStorage from "./LocalStorage";
import { StateType } from "../store";
import { ScoreState } from "../reducers/score";

export const getSavegame = async (username: string): Promise<ScoreState> => {
  // console.log("localstorage", localStorage.loadSavegame());

  console.log("hmmmmm", username);

  return await api.getStateFromBackend(username);
};

export const saveSavegame = (store: StateType): void => {
  // localStorage.saveSavegame(store);

  api.saveStateToBackend(store);

};
