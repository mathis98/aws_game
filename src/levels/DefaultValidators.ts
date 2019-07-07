import { LevelValidator, LevelState, LevelFeedback } from './level';
import { deepStrictEqual } from 'assert';


export function ExactMatchValidator(desiredState: LevelState): LevelValidator {
  const validator: LevelValidator = (state) => {
    try {
      deepStrictEqual(state, desiredState);
      return { correct: true };
    } catch {
      return { correct: false };
    }
  }
  return validator;
}

export function autoCompleteFeedback(feedback: LevelFeedback): void {
  feedback.maxPoints = feedback.maxPoints || 100;
  if (feedback.correct) {
    feedback.stars  = feedback.stars || Math.ceil(3 * feedback.points / (feedback.maxPoints || 100)) || 3;
    feedback.stars = Math.min(3, Math.max(1, feedback.stars));
    feedback.points = feedback.points || Math.round(100 * feedback.stars / 3);
  } else {
    feedback.stars = 0;
    feedback.points = 0;
  }
}
