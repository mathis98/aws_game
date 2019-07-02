import { Level, LevelFeedback, LevelState } from './level'
import * as React from 'react'

const level4: Level ={
  columns: 4,
  rows: 4,
  gap: "3em",
  elements: [
    {
      position: {
        column: 0,
        row: 1
      },
      id: "users",
      icon: "users"
    },
    {
      position: {
        column: 1,
        row: 1
      },
      id: "shield",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 1
      },
      id: "cognito",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 1
      },
      id: "gameserver",
      icon: "gameserver"
    },
    {
      position: {
        column: 3,
        row: 2
      },
      id: "dynamodb",
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
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "gameserver",
      targetId: "dynamodb",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      doubleArrow: true,
      dashed: true
    }
  ],
  awspalette: ["shield", "cognito", "dynamodb", "s3"],
  validator: Level4Validator
};

function Level4Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if( !(state.shield === "shield") )
    return { correct: false, feedbackComponent: "Der Login-Service ist gegen DDoS Angriffe ungeschützt!" };
  if( !(state.cognito === "cognito") )
    return { correct: false, feedbackComponent: "Die Benutzer und Server können nicht mit einem Benutzerverwaltungssystem interagieren." };
  if( !(state.dynamodb === "s3" || state.dynamodb === "dynamodb") )
    return { correct: false, feedbackComponent: "Die Spieldaten können nicht gespeichert werden." };

  // possible:
  let stars = 3;
  let message = "";
  if (state.dynamodb === "s3") {
    stars--;
    message += "Die Spieldaten sind zu klein für S3. ";
  }
  return {correct: true, stars: stars, feedbackComponent: message};
}

export default level4;
