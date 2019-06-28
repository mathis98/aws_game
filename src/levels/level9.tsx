import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level9: Level = {
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
      id: "lakeFormation",
      droppable: true,
    },
    {
      position: {
        column: 0,
        row: 2,
      },
      id: "s3",
      droppable: true,
    },
    {
      position: {
        column: 1,
        row: 1,
      },
      id: "redshift",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 1,
      },
      id: "forecast",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 2,
      },
      id: "mobile",
      icon: "mobile"
    },
  ],
  relations: [
    {
      sourceId: "weatherStation",
      targetId: "lakeFormation",
      sourceAnchor: "bottom",
      targetAnchor: "top",
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
      sourceId: "lakeFormation",
      targetId: "redshift",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "redshift",
      targetId: "forecast",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "forecast",
      targetId: "mobile",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
  ],
  awspalette: ["redshift", "forecast", "s3", "lakeFormation", "dynamodb", "lambdaTensorflow"],
  validator: level9Validator,
};

function level9Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if(state.lakeFormation !== "lakeFormation" )
    return { correct: false, feedbackComponent: "Die rohen Daten brauchen ein Interface." };
  if( !(state.s3 === "s3" || state.s3 === "dynamodb"))
    return { correct: false, feedbackComponent: "Die Wetterdaten können nicht abgespeichert werden." };
  if(state.redshift !== "redshift" )
    return { correct: false, feedbackComponent: "" };
  if( !(state.forecast === "forecast" || state.forecast === "lambdaTensorflow"))
    return { correct: false, feedbackComponent: "lol" };

  // possible:
  if(state.s3 === "dynamodb") // really false?, why doesnt dynamodb work?
    return { correct: false, feedbackComponent: "Data Lakes können nicht in Datenbanken wie Dynamo erstellt werden." };
  if (state.forecast === "lambdaTensorflow") {
    return {correct: true, stars: 2, feedbackComponent: "Gute Wahl, wenn Machine Learning den Mittelpunkt des Services darstellen soll. Es gibt aber anderse AWS Webservices, die diese Arbeit übernehmen." };
  }

  // perfect:
  if (state.forecast === "forecast") {
    return {correct: true, stars: 3};
  }

  return {correct: false};
}

export default level9;
