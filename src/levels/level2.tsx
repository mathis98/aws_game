import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level2: Level ={
    columns: 6,
  rows: 6,
  gap: "1em",
  elements: [
    {
      position: {
        column: 1,
        row: 1
      },
      id: "camera",
      icon: "camera"
    },
    {
      position: {
        column: 1,
        row: 4
      },
      id: "documents",
      icon: "documents"
    },
    {
      position: {
        column: 2,
        row: 2
      },
      id: "S3",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 3
      },
      id: "dynamo",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 4
      },
      id: "shop",
      icon: "shop"
    },
    {
      position: {
        column: 4,
        row: 4
      },
      id: "customer",
      icon: "customer"
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "S3",
      sourceAnchor: "bottom",
      targetAnchor: "left"
    },
    {
      sourceId: "documents",
      targetId: "dynamo",
      sourceAnchor: "top",
      targetAnchor: "left"
    },
    {
      sourceId: "dynamo",
      targetId: "shop",
      sourceAnchor: "right",
      targetAnchor: "top"
    },
    {
      sourceId: "S3",
      targetId: "customer",
      sourceAnchor: "right",
      targetAnchor: "top"
    },
    {
      sourceId: "S3",
      targetId: "shop",
      sourceAnchor: "right",
      targetAnchor: "top"
    }
  ],
  awspalette: ["s3", "dynamodb"],
  validator: Level2Validator
}

export default level2;

function Level2Validator(state: LevelState): LevelFeedback {
  if (state.dynamo === "dynamodb" && state.S3 === "s3") {
    return {correct: true, stars: 3};
  } else if (state.dynamo === "s3" && state.S3 === "s3") {
    return {correct: true, points: 20};
  } else if (state.dynamo === "dynamodb" && state.S3 === "dynamodb") {
    return { correct: true, points: 10};
  } else if (state.dynamo === "s3" && state.S3 === "dynamodb") {
    return { correct: false, feedbackComponent: <span>Das ist aber wirklich nicht sinnvoll!</span> }; // TODO: set to true, just to show the correct: false case
  }

  return {correct: false};
}
