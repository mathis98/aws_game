import { ScoreState } from "./reducers/score";

export const SET_SCORE = 'SET_SCORE';
export const NEXT_LEVEL = 'NEXT_LEVEL';
export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';
export const SET_NEXT_LEVEL = 'SET_NEXT_LEVEL';
export const RESET_SCORE = 'RESET_SCORE';
export const SET_USERNAME = 'SET_USERNAME';

export const setScore = (score: number, level: number, stars: number) => ({
  type: SET_SCORE,
  score,
  level,
  stars,
});

export const setNextLevel = (level: number) => ({
  type: SET_NEXT_LEVEL,
  level
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const receiveInitialData = (data: ScoreState) => ({
  type: RECEIVE_INITIAL_DATA,
  data,
});

export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  username,
});

