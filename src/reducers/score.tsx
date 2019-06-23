import {SET_SCORE, NEXT_LEVEL} from '../actions';
import {LEVELS} from 'levels/levels';

export interface ScoreAction {
  type: string;
  score: number;
  level: number;
  stars: number;
}

export interface scoreType {
  points: number;
  stars: number;
}

export interface ScoreState {
  score: scoreType[];
  level: number;
}

const initialState = {
    score: new Array(LEVELS.length).fill({points:0, stars:0}),
    level: 1,
};

const score = (state: ScoreState = initialState, action: ScoreAction) => {
  switch (action.type) {
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
    case NEXT_LEVEL:
      return {
        ...state,
        level: state.level + 1,
      };
    default:
      return state
  }
};

export function scoreSum(array: scoreType[]) {
  return array.reduce((acc, el) => el.points + acc, 0);
}

export default score;
