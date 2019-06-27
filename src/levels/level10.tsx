import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level10: Level = {
  columns: 5,
  rows: 3,
  gap: "2em",
  elements: [
    {
      position: {
        column: 0,
        row: 0,
      },
      id: "input",
      icon: " TODO ",
    },
    {
      position: {
        column: 1,
        row: 0,
      },
      id: "IoTCore",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 0,
      },
      id: "s3",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 1,
      },
      id: "analytics",
      droppable: true,
    },  
    {
      position: {
        column: 3,
        row: 0,
      },
      id: "quicksight",
      droppable: true,
    },  
    {
      position: {
        column: 3,
        row: 1,
      },
      id: "sagemaker",
      droppable: true,
    },   
    {
      position: {
        column: 4,
        row: 0,
      },
      id: "sns",
      droppable: true,
    },  
    {
      position: {
        column: 4,
        row: 1,
      },
      id: "ses",
      droppable: true,
    },       
    {
      position: {
        column: 5,
        row: 2,
      },
      id: "customer",
      icon: "customer"
    },
  ],
  relations: [
    {
      sourceId: "input",
      targetId: "IoTCore",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "IoTCore",
      targetId: "s3",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "s3",
      targetId: "analytics",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      doubleArrow: "true",
    },
    {
      sourceId: "s3",
      targetId: "quicksight",
      sourceAnchor: "right",
      targetAnchor: "left",
    },    
    {
      sourceId: "s3",
      targetId: "sagemaker",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "quicksight",
      targetId: "sns",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "quicksight",
      targetId: "ses",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "sns",
      targetId: "customer",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "ses",
      targetId: "customer",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "shield", "ses", "sns", "lambdaTensorflow", "kinesis", "lambda", "IoTCore", "quicksight", "sagemaker",´"analytics"],
  validator: Level10Validator,
};

function Level10Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if(state.sagemaker !== "sagemaker" )
    return { correct: false, feedbackComponent: "Noch nicht implementiert." };
  if(state.analytics !== "analytics" )
    return { correct: false, feedbackComponent: "Noch nicht implementiert." };
  if(state.IoTCore !== "IoTCore")
    return { correct: false, feedbackComponent: "Noch nicht implementiert." };
  if(state.quicksight !== "quicksight" )
    return { correct: false, feedbackComponent: "Noch nicht implementiert." };
  if( !(state.s3 === "s3" || state.s3 === "dynamodb"))
    return { correct: false, feedbackComponent: "Noch nicht implementiert." };
  if(!(state.ses === "ses" || state.ses === "sns"))
    return { correct: false, feedbackComponent: "Noch nicht implementiert." };
  if(!(state.sns === "ses" || state.sns === "sns"))
    return { correct: false, feedbackComponent: "Noch nicht implementiert." };

  // possible:
  if (state.s3 === "dynamodb") {
    return {correct: true, stars: 2, feedbackComponent: "Bei großen Dateien eignet sich dynamoDB weniger." };
  }
  // perfect:
  if (state.s3 === "s3" && ((state.sns === "ses" && state.ses === "sns"|| state.sns === "sns" && state.ses === "ses") )) {
    return {correct: true, stars: 3};
  }

  return {correct: false};
}

export default level10;
