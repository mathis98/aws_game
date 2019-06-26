import { StateType } from "../store";
import { ScoreState } from "../reducers/score";

export const loadUsername = (): string => {
  const serializedState = localStorage.getItem('state');
  if (serializedState) {
    return JSON.parse(serializedState).username;
  }
  return '';
};

/**
 * Function that loads the serialized state from localStorage
 * @return the deserialized state on success or undefined on error
 */
export const loadSavegame = (): ScoreState => {
  try {
    // load the serialized state from localStorage
    const serializedState = localStorage.getItem('state');
    // if no such thing return undefined
    if (serializedState == null) return undefined;
    // deserialize the state
    const state = JSON.parse(serializedState).score;

    // /**
    //  * if new levels where added since last play
    //  * add points 0 and 0 stars in levels array
    //  */
    // if (state.score.score.length < LEVELS.length) {
    //   let temp = new Array(LEVELS.length - state.score.score.length)
    //     .fill({points: 0, stars: 0});
    //   state.score.score.append(temp);
    // }
    return state;
  } catch (e) {
    return undefined;
  }
};

/**
 * Function that saves a serialized representation of the state into localStorage
 * @param state The state to be saved
 * Errors could be logged but are rather ignored for brevity
 */
export const saveSavegame = (state: StateType): void => {
  try {
    // serialize the state
    const serializedState = JSON.stringify(state);
    // save it in localStorage
    localStorage.setItem('state', serializedState);
  } catch (e) {
    e.print();
  }
};
