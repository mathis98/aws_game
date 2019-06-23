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
      id: "lambda_image_metadata",
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
      targetId: "lambda_image_metadata",
      sourceAnchor: "right",
      targetAnchor: "left"
    },
    {
      sourceId: "lambda_image_metadata",
      targetId: "dynamodb",
      sourceAnchor: "right",
      targetAnchor: "left"
    }
  ],
  awspalette: ["s3", "dynamodb", "lambda_image_metadata"],
  validator: Level3Validator
}

function Level3Validator(state: LevelState): LevelFeedback {
  if (
    state.s3 === 's3' &&
    state.lambda_image_metadata === 'lambda_image_metadata' &&
    state.dynamodb === 'dynamodb'
  ) {
    return {correct: true};
  }
  return {correct: false};
}

export default level3;
