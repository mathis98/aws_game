import { SET_NEXT_LEVEL } from '../actions';

/**
 * middleware for preventing that the wrong level is set as next level
 * Wrong can mean:
 * 1) there are
 * @param  {Function} dispatch used to dispatch a new redux action
 * @param  {Function} getState function that returns the current State
 * @return {Function}          either a new action or next(action) which
 *                             runs the action it wanted to anyway
 */
const preventWrongLevel = ({ dispatch, getState }: { dispatch: any, getState: any}) =>
(next: any) =>
(action: any) => {
  // we want to intercept SET_NEXT_LEVEL actions only
  if (action.type === SET_NEXT_LEVEL) {
    // store the score state in s
    let s = getState().score.score;
    /**
     * if
     * 1) there are less levels then nextLevel   or
     * 2) nextLevel has already been played through
     *
     * find the first unplayed level and set nextLevel to that one
     * if there are no more unplayed levels set nextLevel to 0
     */
    if (s.length < action.level ||
        (action.level > 0 && s[action.level - 1].points > 0)) {
      let n = s.findIndex((e: any) => e.points == 0) + 1;
      return dispatch({ type: SET_NEXT_LEVEL, level: n || 0 });
    }
  }
  // otherwise just continue
  return next(action);
};

export default preventWrongLevel;
