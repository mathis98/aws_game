import * as React from 'react'
import { Level, LevelFeedback, LevelState } from './level'

const level3: Level ={
  columns: 3,
  rows: 3,
  gap: "2em",
  elements: [
    {
      position: {
        column: 0,
        row: 0
      },
      id: "camera",
      icon: "camera2"
    },
    {
      position: {
        column: 0,
        row: 1
      },
      id: "s3",
      droppable: true
    },
    {
      position: {
        column: 1,
        row: 1
      },
      id: "lambda_image_metadata",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 1
      },
      id: "dynamodb",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 2
      },
      id: "shop",
      icon: "shop2"
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "s3",
      sourceAnchor: "bottom",
      targetAnchor: "top"
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
    },
    {
      sourceId: "dynamodb",
      targetId: "shop",
      sourceAnchor: "bottom",
      targetAnchor: "top"
    }
  ],
  awspalette: ["s3", "dynamodb", "lambda_image_metadata"],
  validator: Level3Validator
};

function Level3Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if( !(state.s3 === "s3" || state.s3 === "dynamodb") )
    return { correct: false, feedbackComponent: "Die Bilder können nicht abgespeichert werden." };
  if( !(state.lambda_image_metadata === "lambda_image_metadata") )
    return { correct: false, feedbackComponent: "Die Metadaten können nicht extrahiert werden." };
  if( !(state.dynamodb === "s3" || state.dynamodb === "dynamodb") )
    return { correct: false, feedbackComponent: "Die extrahierten Metadaten können nicht abgespeichert werden." };

  // possible:
  let stars = 3;
  let message = "";
  if (state.s3 === "dynamodb") {
    stars--;
    message += "Bilder sind zu groß für DynamoDB. ";
  }
  if (state.dynamodb === "s3") {
    stars--;
    message += "Metadaten sind kleine Dateien und ineffizient für S3. ";
  }
  return {correct: true, stars: stars, feedbackComponent: message};
}

export default level3;
