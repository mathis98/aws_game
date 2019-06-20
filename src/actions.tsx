export const SET_SCORE = 'SET_SCORE';
export const NEXT_LEVEL = 'NEXT_LEVEL';

export const setScore = (score: number, level: number, stars: number) => ({
  type: SET_SCORE,
  score,
  level,
  stars,
});

export const nextLevel = () => ({
  type: NEXT_LEVEL,
});
