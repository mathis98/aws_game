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
      id: "weatherStation",
      icon: "weatherStation",
    },
    {
      position: {
        column: 2,
        row: 1,
      },
      id: "kinesis",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 2,
      },
      id: "dynamo",
      droppable: true,
    },
    {
      position: {
        column: 3,
        row: 1,
      },
      id: "lambda",
      droppable: true,
    },
    {
      position: {
        column: 4,
        row: 1,
      },
      id: "ses",
      droppable: true,
    },
    {
      position: {
        column: 5,
        row: 1,
      },
      id: "users",
      icon: "users"
    },
  ],
  relations: [
    {
      sourceId: "weatherStation",
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
