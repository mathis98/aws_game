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
      id: "kinesis",
      droppable: true,
    },
  ],
  relations: [
    {
      sourceId: "customer",
      targetId: "kinesis",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "shield", "ses", "lambdaTensorflow", "kinesis", "lambda"],
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
