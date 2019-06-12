export const ADD_SCORE = 'ADD_SCORE';
export const NEXT_LEVEL = 'NEXT_LEVEL';

export const addScore = (score: number) => ({
  type: ADD_SCORE,
  score,
});

export const nextLevel = () => ({
  type: NEXT_LEVEL,
});
