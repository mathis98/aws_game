import { SET_SCORE, SET_NEXT_LEVEL, RECEIVE_INITIAL_DATA, RESET_SCORE } from '../actions';
import { LEVELS } from 'levels/levels';

export interface ScoreAction {
  type: string;
  score: number;
  level: number;
  stars: number;
  data: ScoreAction;
}

export interface ScoreType {
  points: number;
  stars: number;
}

export interface ScoreState {
  score: ScoreType[];
  level: number;
}

const initialState = {
    score: new Array(LEVELS.length).fill({points:0, stars:0}),
    level: 1,
};

const score = (state: ScoreState = initialState, action: ScoreAction) => {
  switch (action.type) {
    case RECEIVE_INITIAL_DATA:
      return action.data;
    case SET_SCORE:
      return {
        ...state,
        score: state.score.map((item:any, index:any) => {
          if (index + 1 !== action.level)
            return item
          return {
            points: action.score,
            stars: action.stars
          }
        })
      }
    case SET_NEXT_LEVEL:
      return {
        ...state,
        level: action.level,
      };
    case RESET_SCORE:
      return {
        ...state,
        level: initialState.level,
        score: initialState.score,
      }
    default:
      return state
  }
};

export function scoreSum(array: ScoreType[]) {
  console.log("arrr", array);

  return array.reduce((acc, el) => el.points + acc, 0);
}

export default score;
