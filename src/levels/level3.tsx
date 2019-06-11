import { Level, LevelFeedback, LevelState } from './level'
import * as React from 'react'

const level3: Level ={
  columns: 6,
  rows: [2, 2, 1, 2, 2],
  gap: "2em",
  elements: [
    {
      position: {
        column: 1,
        row: 1
      },
      id: "users",
      icon: "users"
    },
    {
      position: {
        column: 2,
        row: 1
      },
      id: "shield",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 1
      },
      id: "iam",
      droppable: true
    },
    {
      position: {
        column: 4,
        row: 1
      },
      id: "gameserver",
      icon: "gameserver"
    },
    {
      position: {
        column: 3,
        row: 3
      },
      id: "dynamo",
      droppable: true
    }
  ],
  relations: [
    {
      sourceId: "users",
      targetId: "shield",
      sourceAnchor: "right",
      targetAnchor: "left"
    },
    {
      sourceId: "shield",
      targetId: "iam",
      sourceAnchor: "right",
      targetAnchor: "left"
    },
    {
      sourceId: "iam",
      targetId: "gameserver",
      sourceAnchor: "right",
      targetAnchor: "left"
    },
    {
      sourceId: "iam",
      targetId: "dynamo",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      doubleArrow: true
    }
  ],
  awspalette: ["iam", "shield", "dynamodb", "s3"],
  validator: Level3Validator
}

function Level3Validator(state: LevelState): LevelFeedback {
  return {correct: false, feedbackComponent: <span>not yet implemented</span>};
}

export default level3;