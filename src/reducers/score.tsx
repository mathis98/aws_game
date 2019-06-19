import {SET_SCORE, NEXT_LEVEL} from '../actions';
import levels from 'levels/levels';

export interface ScoreAction {
  type: string;
  score: number;
  level: number;
}

export interface ScoreState {
  score: number[];
  level: number;
}

const initialState = {
    score: new Array(levels.length).fill(0),
    level: 1,
};

const score = (state: ScoreState = initialState, action: ScoreAction) => {
  switch (action.type) {
    case SET_SCORE:
      console.log(action);
      return {
        ...state,
        score: state.score.map((item, index) => {
          if (index + 1 !== action.level)
            return item
          return action.score
        })
      }
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
