import * as React from 'react';
import { Level, LevelState, LevelFeedback} from './level';

const level2: Level ={
    columns: 6,
  rows: 6,
  gap: "1em",
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
        column: 1,
        row: 4
      },
      id: "documents",
      icon: "documents"
    },
    {
      position: {
        column: 2,
        row: 2
      },
      id: "s3",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 3
      },
      id: "dynamodb",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 4
      },
      id: "shop",
      icon: "shop"
    },
    {
      position: {
        column: 4,
        row: 4
      },
      id: "customer",
      icon: "customer"
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "s3",
      sourceAnchor: "bottom",
      targetAnchor: "left"
    },
    {
      sourceId: "documents",
      targetId: "dynamodb",
      sourceAnchor: "top",
      targetAnchor: "left"
    },
    {
      sourceId: "dynamodb",
      targetId: "shop",
      sourceAnchor: "right",
      targetAnchor: "top"
    },
    {
      sourceId: "s3",
      targetId: "customer",
      sourceAnchor: "right",
      targetAnchor: "top"
    },
    {
      sourceId: "s3",
      targetId: "shop",
      sourceAnchor: "right",
      targetAnchor: "top"
    }
  ],
  awspalette: ["s3", "dynamodb"],
  validator: Level2Validator
};

function Level2Validator(state: LevelState): LevelFeedback {
  // needs to be correct
  if( !(state.dynamodb === "s3" || state.dynamodb === "dynamodb"))
    return { correct: false, feedbackComponent: "Die Kundendaten werden nicht abgespeichert." };
  if( !(state.s3 === "s3" || state.s3 === "dynamodb"))
    return { correct: false, feedbackComponent: "Die Bilder werden nicht abgespeichert." };

  // possible:
  var stars = 3;
  var message = "";
  if (state.dynamodb === "s3") {
    stars--;
    message += "Ein S3 Bucket wird nicht effizient genutzt. ";
  }
  if (state.s3 === "dynamodb") {
    stars--;
    message += "Ein DynamoDB wird nicht effizient genutzt. ";
  }
  return {correct: true, stars: stars, feedbackComponent: message};
}

export default level2;
