import { Level, LevelFeedback, LevelState } from './level'
import * as React from 'react'

const level4: Level ={
  columns: 4,
  rows: 1,
  gap: "2em",
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
        column: 2,
        row: 1
      },
      id: "s3",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 1
      },
      id: "lambda",
      droppable: true
    },
    {
      position: {
        column: 4,
        row: 1
      },
      id: "dynamo",
      droppable: true
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "s3",
      sourceAnchor: "right",
      targetAnchor: "left"
    },
    {
      sourceId: "s3",
      targetId: "lambda",
      sourceAnchor: "right",
      targetAnchor: "left"
    },
    {
      sourceId: "lambda",
      targetId: "dynamo",
      sourceAnchor: "right",
      targetAnchor: "left"
    }
  ],
  awspalette: ["s3", "dynamodb"],
  validator: Level4Validator
}

function Level4Validator(state: LevelState): LevelFeedback {
  return {correct: false, feedbackComponent: <span>not yet implemented</span>};
}

export default level4;
