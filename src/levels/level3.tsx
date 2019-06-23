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
      id: "cognito",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 3
      },
      id: "gameserver",
      icon: "gameserver"
    },
    {
      position: {
        column: 2,
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
      targetId: "cognito",
      sourceAnchor: "right",
      targetAnchor: "left"
    },
    {
      sourceId: "cognito",
      targetId: "gameserver",
      sourceAnchor: "bottom",
      targetAnchor: "top"
    },
    {
      sourceId: "gameserver",
      targetId: "dynamo",
      sourceAnchor: "left",
      targetAnchor: "right",
      doubleArrow: true
    }
  ],
  awspalette: ["shield", "cognito", "dynamodb", "s3"],
  validator: Level3Validator
}

function Level3Validator(state: LevelState): LevelFeedback {
  if (state.cognito === "cognito" && state.dynamo === "dynamodb" && state.shield === "shield") {
    return {correct: true, stars: 3};
  } else if (state.cognito === "cognito" && state.dynamo === "s3" && state.shield === "shield") {
    return {correct: true, points: 20};
  } else if (state.cognito === "shield" && state.shield === "cognito") {
    return { correct: false, feedbackComponent: "Der Login-Service ist gegen DDoS Angriffe ungeschützt!"}
  }
  return {correct: false};
}

export default level3;
