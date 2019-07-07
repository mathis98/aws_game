import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level10: Level = {
  columns: 4,
  rows: 3,
  gap: "2em",
  elements: [
    {
      position: {
        column: 0,
        row: 0,
      },
      id: "waterTap",
      icon: "waterTap",
    },
    {
      position: {
        column: 0,
        row: 1,
      },
      id: "cactus",
      icon: "cactus",
    },
    {
      position: {
        column: 1,
        row: 0,
      },
      id: "Sagemaker",
      droppable: true,
    },
    {
      position: {
        column: 1,
        row: 1,
      },
      id: "IoTCore",
      droppable: true,
    },
    {
      position: {
        column: 1,
        row: 2,
      },
      id: "s3",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 1,
      },
      id: "QuickSight",
      droppable: true,
    },
    {
      position: {
        column: 3,
        row: 1,
      },
      id: "sns",
      droppable: true,
    },
    {
      position: {
        column: 3,
        row: 2,
      },
      id: "customer",
      icon: "customer2"
    },
  ],
  relations: [
    {
      sourceId: "waterTap",
      targetId: "cactus",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
    {
      sourceId: "cactus",
      targetId: "IoTCore",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "IoTCore",
      targetId: "s3",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      doubleArrow: true,
      dashed: true,
    },
    {
      sourceId: "IoTCore",
      targetId: "Sagemaker",
      sourceAnchor: "top",
      targetAnchor: "bottom",
      doubleArrow: true,
    },
    {
      sourceId: "Sagemaker",
      targetId: "waterTap",
      sourceAnchor: "left",
      targetAnchor: "right",
    },
    {
      sourceId: "IoTCore",
      targetId: "QuickSight",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "QuickSight",
      targetId: "sns",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "sns",
      targetId: "customer",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
  ],
  awspalette: ["s3", "dynamodb", "ses", "sns", "lambdaTensorflow", "kinesis", "IoTCore", "QuickSight", "Sagemaker"],
  validator: Level10Validator,
};

function Level10Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if( !(state.IoTCore === "IoTCore" || state.IoTCore === "kinesis"))
    return { correct: false, feedbackComponent: "Die Sensordaten können nicht richtig empfangen und verwendet werden." };
  if( !(state.s3 === "s3" || state.s3 === "dynamodb"))
    return { correct: false, feedbackComponent: "Die Daten werden nicht gespeichert." };
  if(!(state.Sagemaker === "Sagemaker" || state.Sagemaker === "lambdaTensorflow"))
    return { correct: false, feedbackComponent: "Es wird kein Machine Learning Modell verwendet, um die Bewässerung zu steuern." };
  if(state.QuickSight !== "QuickSight" )
    return { correct: false, feedbackComponent: "Die Daten werden nicht visualisiert." };
  if(!(state.sns === "ses" || state.sns === "sns"))
    return { correct: false, feedbackComponent: "Der Kunde bekommt keine Benachrichtigungen der visualisierten Daten." };

  // possible:
  let stars = 3;
  let message = "";

  if (state.IoTCore === "kinesis") {
    stars--;
    message += "Es gibt noch andere Möglichkeiten die Sensordaten einzulesen. ";
  }
  if (state.s3 === "dynamodb") {
    stars--;
    message += "Bei großen Dateien eignet sich dynamoDB weniger. ";
  }
  if (state.Sagemaker === "lambdaTensorflow") {
    stars--;
    message += "Sagemaker eignet sich hier besser für maschinelles Lernen. ";
  }
  if (state.sns === "ses") {
    stars--;
    message += "Der Kunde möchte die Updates lieber auf seinem Smartphone erhalten. ";
  }

  return {correct: true, stars: stars, feedbackComponent: message};
}

export default level10;
