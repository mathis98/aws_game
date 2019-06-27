import { Level, LevelFeedback, LevelState } from './level'
import * as React from 'react'

const level7: Level ={
  columns: 3,
  rows: 2,
  gap: "2em",
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
      id: "lambda_stock_data",
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
      targetId: "lambda_stock_data",
      sourceAnchor: "right",
      targetAnchor: "left",
      doubleArrow: true
    },
    {
      sourceId: "lambda_stock_data",
      targetId: "dynamodb",
      sourceAnchor: "top",
      targetAnchor: "bottom"
    }
  ],
  awspalette: ["s3", "dynamodb", "lambda_stock_data", "api_gateway"],
  validator: Level7Validator
}

function Level7Validator(state: LevelState): LevelFeedback {
  if (
    state.s3 === 's3' &&
    state.dynamodb === 'dynamodb' &&
    state.lambda_stock_data === 'lambda_stock_data' &&
    state.api_gateway === 'api_gateway'
  ) {
    return {correct: true};
  }
  return {correct: false};
}

export default level7;
