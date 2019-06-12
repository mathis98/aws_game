import {ADD_SCORE, NEXT_LEVEL} from '../actions';

export interface ScoreAction {
  type: string;
  score?: number;
}

export interface ScoreState {
  score: number;
  level: number;
}

const initialState = {
    score: 0,
    level: 1,
};

const score = (state: ScoreState = initialState, action: ScoreAction) => {
  switch (action.type) {
    case ADD_SCORE:
      return {
        ...state,
        score: state.score + action.score,
      };
    case NEXT_LEVEL:
      return {
        ...state,
        level: state.level + 1,
      };
    default:
      return state
  }
};

export default score;
