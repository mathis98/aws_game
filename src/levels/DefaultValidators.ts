import { LevelValidator, LevelState } from './level';
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
