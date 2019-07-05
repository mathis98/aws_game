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
        row: 1,
      },
      id: "input",
      icon: "cactus",
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
        column: 2,
        row: 1,
      },
      id: "s3",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 3,
      },
      id: "Analytics",
      droppable: true,
    },  
    {
      position: {
        column: 3,
        row: 0,
      },
      id: "QuickSight",
      droppable: true,
    },  
    {
      position: {
        column: 3,
        row: 2,
      },
      id: "Sagemaker",
      droppable: true,
    },   
    {
      position: {
        column: 4,
        row: 1,
      },
      id: "sns",
      droppable: true,
    },        
    {
      position: {
        column: 5,
        row: 1,
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
      targetId: "Analytics",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      doubleArrow: true,
    },
    {
      sourceId: "s3",
      targetId: "QuickSight",
      sourceAnchor: "right",
      targetAnchor: "bottom",
    },    
    {
      sourceId: "s3",
      targetId: "Sagemaker",
      sourceAnchor: "right",
      targetAnchor: "top",
    },
    {
      sourceId: "QuickSight",
      targetId: "sns",
      sourceAnchor: "right",
      targetAnchor: "top",
    },
    {
      sourceId: "sns",
      targetId: "customer",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "Sagemaker",
      targetId: "customer",
      sourceAnchor: "right",
      targetAnchor: "bottom",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "shield", "ses", "sns", "lambdaTensorflow", "kinesis", "IoTCore", "QuickSight", "Sagemaker", "Analytics"],
  validator: Level10Validator,
};

function Level10Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if(state.Sagemaker !== "Sagemaker" )
    return { correct: false, feedbackComponent: "Der Kunde möchte ein Machine Learning Modell für die spätere Automatisierung generieren lassen." };
  if(state.Analytics !== "Analytics" )
    return { correct: false, feedbackComponent: "Die Daten müssen ausgewertet werden." };
  if(state.IoTCore !== "IoTCore")
    return { correct: false, feedbackComponent: "Es ist wichtig die Sensordaten entsprechend zu verarbeiten." };
  if(state.QuickSight !== "QuickSight" )
    return { correct: false, feedbackComponent: "Der Kunde möchte Visualisierte Ergebnisse." };
  if( !(state.s3 === "s3" || state.s3 === "dynamodb"))
    return { correct: false, feedbackComponent: "Die Daten müssen sicher gespeichert werden." };
  if(!(state.sns === "ses" || state.sns === "sns"))
    return { correct: false, feedbackComponent: "Der Kunde möchte regelmäßig geupdated werden." };

  // possible:
  if(state.sns === "ses")
    return {correct: true, stars: 1, feedbackComponent: "Der Kunde möchte die Updates lieber auf sein Smartphone erhalten." };
  if (state.s3 === "dynamodb")
    return {correct: true, stars: 2, feedbackComponent: "Bei großen Dateien eignet sich dynamoDB weniger." };
    
  // perfect:
  if (state.s3 === "s3" && state.sns === "sns") {
    return {correct: true, stars: 3};
  }

  return {correct: false};
}

export default level10;
