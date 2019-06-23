import { Level, LevelFeedback, LevelState } from './level'
import * as React from 'react'

const level3: Level ={
  columns: 6,
  rows: 3,
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
      id: "dynamodb",
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
      targetId: "dynamodb",
      sourceAnchor: "right",
      targetAnchor: "left"
    }
  ],
  awspalette: ["s3", "dynamodb", "lambda"],
  validator: Level3Validator
}

function Level3Validator(state: LevelState): LevelFeedback {
  if (state.s3 === 's3' && state.lambda === 'lambda' && state.dynamodb === 'dynamodb') {
    return {correct: true, feedbackComponent: <span>Sehr gut.</span>};
  }
  return {correct: false, feedbackComponent: <span>Leider nicht richtig.</span>};
}

export default level3;
