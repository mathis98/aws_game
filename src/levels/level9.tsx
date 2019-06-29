import * as React from 'react';
import { Level, LevelState, LevelFeedback} from './level';

const level9: Level = {
  columns: 4,
  rows: 3,
  gap: "2em",
  elements: [
    {
      position: {
        column: 0,
        row: 1,
      },
      id: "weatherData",
      icon: "weatherData",
    },
    {
      position: {
        column: 1,
        row: 0,
      },
      id: "redshift",
      droppable: true,
    },
    {
      position: {
        column: 1,
        row: 1,
      },
      id: "lakeFormation",
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
        row: 0,
      },
      id: "forecast",
      droppable: true,
    },
    {
      position: {
        column: 3,
        row: 0,
      },
      id: "webServer",
      icon: "webServer"
    },
  ],
  relations: [
    {
      sourceId: "weatherData",
      targetId: "lakeFormation",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "redshift",
      targetId: "lakeFormation",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      doubleArrow: true,
    },
    {
      sourceId: "lakeFormation",
      targetId: "s3",
      sourceAnchor: "bottom",
      targetAnchor: "top",
      dashed: true,
      doubleArrow: true,
    },
    {
      sourceId: "redshift",
      targetId: "forecast",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "forecast",
      targetId: "webServer",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
  ],
  awspalette: ["s3", "dynamodb", "iam", "shield", "ses", "lambdaTensorflow", "kinesis", "redshift", "forecast", "lakeFormation"],
  validator: level9Validator,
};

function level9Validator(state: LevelState): LevelFeedback {
  // needs to be correct
  if( !(state.lakeFormation === "lakeFormation" ) )
    return { correct: false, feedbackComponent: "Die Wetterdaten brauchen ein Interface." };
  if( !(state.s3 === "s3" || state.s3 === "dynamodb") )
    return { correct: false, feedbackComponent: "Die Wetterdaten können nicht abgespeichert werden." };
  if( !(state.redshift === "redshift" ) )
    return { correct: false, feedbackComponent: "Lake Formation ist nicht mit einem Data Warehouse verknüpft." };
  if( !(state.forecast === "forecast" || state.forecast === "lambdaTensorflow") )
    return { correct: false, feedbackComponent: "Die Wetterdaten werden nicht analysiert." };

  // possible:
  var stars = 3;
  var message = "";
  if (state.s3 === "dynamodb") {
    stars--;
    message += "Lake Formation kommt mit S3 besser zurecht. ";
  }
  if (state.forecast === "lambdaTensorflow") {
    stars--;
    message += "Es gibt ein extra AWS service für Machine Learning. ";
  }
  return {correct: true, stars: stars, feedbackComponent: message};
}

export default level9;
