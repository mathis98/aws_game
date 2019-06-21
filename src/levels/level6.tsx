import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level6: Level = {
  columns: 5,
  rows: 4,
  gap: "1em",
  elements: [
    {
      position: {
        column: 1,
        row: 1,
      },
      id: "customer",
      icon: "customer",
    },
    {
      position: {
        column: 2,
        row: 1,
      },
      id: "hmm",
      droppable: true,
    },
  ],
  relations: [
    {
      sourceId: "customer",
      targetId: "ses",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "hmm",
      targetId: "hmm",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "shield", "ses", "lambdaTensorflow", "hmm"],
  validator: Level6Validator,
};

function Level6Validator(state: LevelState): LevelFeedback {
  if (true) {
    return {correct: true, stars: 3};
  } else {
    return {correct: false, feedbackComponent: <span>Das funktioniert nicht!</span>};
  }

  return {correct: false};
}

export default level6;
