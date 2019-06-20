import { ScoreState } from "./reducers/score";

export const SET_SCORE = 'SET_SCORE';
export const NEXT_LEVEL = 'NEXT_LEVEL';
export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';

export const setScore = (score: number, level: number, stars: number) => ({
  type: SET_SCORE,
  score,
  level,
  stars,
});

export const nextLevel = () => ({
  type: NEXT_LEVEL,
});

export const receiveInitialData = (data: ScoreState) => ({
  type: RECEIVE_INITIAL_DATA,
  data,
});
