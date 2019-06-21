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
      id: "ses",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 2,
      },
      id: "lambdaTensorflow",
      droppable: true,
    },
    {
      position: {
        column: 3,
        row: 2,
      },
      id: "supportEmployee",
      icon: "supportEmployee",
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
      sourceId: "ses",
      targetId: "lambdaTensorflow",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
    {
      sourceId: "lambdaTensorflow",
      targetId: "supportEmployee",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "shield", "ses", "lambdaTensorflow"],
  validator: Level5Validator,
};

function Level5Validator(state: LevelState): LevelFeedback {
  if (state.ses === "ses" && state.lambdaTensorflow === "lambdaTensorflow") {
    return {correct: true, stars: 3};
  } else {
    return {correct: false, feedbackComponent: <span>Das funktioniert nicht!</span>};
  }

  return {correct: false};
}

export default level6;
