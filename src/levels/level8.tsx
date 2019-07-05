import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level8: Level = {
  columns: 5,
  rows: 3,
  gap: "2em",
  elements: [
    {
      position: {
        column: 0,
        row: 1,
      },
      id: "sender",
      icon: "client",
    },
    {
      position: {
        column: 1,
        row: 1,
      },
      id: "apiGateway",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 1,
      },
      id: "lambda_rec_data",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 2,
      },
      id: "dynamodb",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 1,
      },
      id: "sns",
      droppable: true
    },
    {
      position: {
        column: 4,
        row: 1,
      },
      id: "rec",
      icon: "mobiles"
    },
  ],
  relations: [
    {
      sourceId: "sender",
      targetId: "apiGateway",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "apiGateway",
      targetId: "lambda_rec_data",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "lambda_rec_data",
      targetId: "dynamodb",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
    {
      sourceId: "lambda_rec_data",
      targetId: "sns",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "sns",
      targetId: "rec",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "lambda_rec_data", "sns", "apiGateway"],
  validator: level8Validator,
};

function level8Validator(state: LevelState): LevelFeedback {
  if (state.apiGateway === "iam") {
    return {correct: false, feedbackComponent: "IAM ermöglicht den Zugriff der Services nur über die Command Line Interface (CLI)"};
  } else if(!(state.lambda_rec_data === "lambda_rec_data")) {
    return { correct: false, feedbackComponent: "Es gibt keine funktion die getriggert werden soll."};
  } else if(state.apiGateway === "apiGateway" && state.lambda_rec_data === "lambda_rec_data" && state.dynamodb === "s3" && state.sns === "sns") {
    return {correct: true, stars: 1, feedbackComponent: "Kontakte mit einem *Namen* und einer *Nummer* können effizienter Gespeichert werden."};
  } else if(state.apiGateway === "apiGateway" && state.lambda_rec_data === "lambda_rec_data" && state.dynamodb === "dynamodb" && state.sns === "sns") {
    return {correct: true, stars: 3};
  }
  return {correct: false};
}

export default level8;
