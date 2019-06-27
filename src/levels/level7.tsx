import { Level, LevelFeedback, LevelState } from './level'
import * as React from 'react'

const level7: Level ={
  columns: 3,
  rows: 2,
  elements: [
    {
      position: {
        column: 0,
        row: 0
      },
      id: "s3",
      droppable: true
    },
    {
      position: {
        column: 0,
        row: 1
      },
      id: "browser",
      icon: "browser"
    },
    {
      position: {
        column: 1,
        row: 1
      },
      id: "api_gateway",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 1
      },
      id: "lambda",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 0
      },
      id: "dynamodb",
      droppable: true
    }
  ],
  relations: [
    {
      sourceId: "s3",
      targetId: "browser",
      sourceAnchor: "bottom",
      targetAnchor: "top"
    },
    {
      sourceId: "browser",
      targetId: "api_gateway",
      sourceAnchor: "right",
      targetAnchor: "left",
      doubleArrow: true
    },
    {
      sourceId: "api_gateway",
      targetId: "lambda",
      sourceAnchor: "right",
      targetAnchor: "left",
      doubleArrow: true
    },
    {
      sourceId: "lambda",
      targetId: "dynamodb",
      sourceAnchor: "top",
      targetAnchor: "bottom"
    }
  ],
  awspalette: ["s3", "dynamodb", "lambda", "api_gateway"],
  validator: Level7Validator
}

function Level7Validator(state: LevelState): LevelFeedback {
  if (
    state.s3 === 's3' &&
    state.dynamodb === 'dynamodb' &&
    state.lambda === 'lambda' &&
    state.api_gateway === 'api_gateway'
  ) {
    return {correct: true};
  }
  return {correct: false};
}

export default level7;
