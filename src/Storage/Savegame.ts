import * as api from "./BackendStorage";
import * as localStorage from "./LocalStorage";
import { StateType } from "../store";
import { ScoreState } from "../reducers/score";

export const getSavegame = async (username: string) => {
  let localSavegame: ScoreState;
  if (username) {
    localSavegame = await api.getStateFromBackend(username);
  } else {
    localSavegame = localStorage.loadSavegame();
  }
  return localSavegame;
};

export const saveSavegame = (store: StateType): void => {
  localStorage.saveSavegame(store);

  api.saveStateToBackend(store);

};
