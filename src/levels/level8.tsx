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
      icon: "mobile",
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
      id: "lambda",
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
        row: 0,
      },
      id: "rec1",
      icon: "mobile"
    },
    {
      position: {
        column: 4,
        row: 1,
      },
      id: "rec2",
      icon: "vdots"
    },
    {
      position: {
        column: 4,
        row: 2,
      },
      id: "rec3",
      icon: "mobile"
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
      targetId: "lambda",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "lambda",
      targetId: "dynamodb",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
    {
      sourceId: "lambda",
      targetId: "sns",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "sns",
      targetId: "re1",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "sns",
      targetId: "rec3",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "lambda", "sns", "apiGateway"],
  validator: level8Validator,
};

function level8Validator(state: LevelState): LevelFeedback {
  if (state.apiGateway === "iam") {
    return {correct: false, feedbackComponent: "IAM ermöglicht den Zugriff der Services nur über die Command Line Interface (CLI)"};
  } else if(!(state.lambda === "lambda")) {
    return { correct: false, feedbackComponent: "Es gibt keine funktion die getriggert werden soll."};
  } else if(state.apiGateway === "apiGateway" && state.lambda === "lambda" && state.dynamodb === "s3" && state.sns === "sns") {
    return {correct: true, stars: 1, feedbackComponent: "Kontakte mit einem *Namen* und einer *Nummer* können effizienter Gespeichert werden."};
  } else if(state.apiGateway === "apiGateway" && state.lambda === "lambda" && state.dynamodb === "dynamodb" && state.sns === "sns") {
    return {correct: true, stars: 3};
  }
  return {correct: false};
}

export default level8;
