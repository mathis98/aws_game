import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level6: Level = {
  columns: 3,
  rows: 3,
  gap: "2em",
  elements: [
    {
      position: {
        column: 0,
        row: 0,
      },
      id: "weatherStation",
      icon: "weatherStation",
    },
    {
      position: {
        column: 0,
        row: 1,
      },
      id: "kinesis",
      droppable: true,
    },
    {
      position: {
        column: 0,
        row: 2,
      },
      id: "dynamodb",
      droppable: true,
    },
    {
      position: {
        column: 1,
        row: 1,
      },
      id: "lambda",
      droppable: true,
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
      id: "users",
      icon: "users"
    },
  ],
  relations: [
    {
      sourceId: "weatherStation",
      targetId: "kinesis",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
    {
      sourceId: "kinesis",
      targetId: "dynamodb",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      dashed: true,
      doubleArrow: true,
    },
    {
      sourceId: "kinesis",
      targetId: "lambda",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "lambda",
      targetId: "ses",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "ses",
      targetId: "users",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "shield", "ses", "lambdaTensorflow", "kinesis", "lambda"],
  validator: Level6Validator,
};

function Level6Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if(state.kinesis !== "kinesis" )
    return { correct: false, feedbackComponent: "Die Wetterdaten werden nicht empfangen." };
  if( !(state.dynamodb === "s3" || state.dynamodb === "dynamodb"))
    return { correct: false, feedbackComponent: "Die Wetterdaten können nicht abgespeichert werden." };
  if(!(state.lambda === "lambda" || state.lambda === "lambdaTensorflow") )
    return { correct: false, feedbackComponent: "Die gesamelten Daten werden nicht richtig verarbeitet" };
  if(state.ses !== "ses" )
    return { correct: false, feedbackComponent: "Es werden keine Emails verschickt." };

  // possible:
  if (state.dynamodb === "s3") {
    return {correct: true, stars: 1, feedbackComponent: "Zu viele kleine Daten für S3." };
  }
  // perfect:
  if (state.dynamodb === "dynamodb") {
    return {correct: true, stars: 3};
  }

  return {correct: false};
}

export default level6;
