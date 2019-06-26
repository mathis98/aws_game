import * as React from 'react';
import { Level, LevelState, LevelFeedback } from './level';

const level9: Level = {
  columns: 6,
  rows: 3,
  gap: "2em",
  elements: [
    {
      position: {
        column: 0,
        row: 0,
      },
      id: "weatherStation1",
      icon: "weatherStation",
    },
    {
      position: {
        column: 0,
        row: 1,
      },
      id: "weatherStation2",
      icon: "weatherStation",
    },
    {
      position: {
        column: 0,
        row: 2,
      },
      id: "weatherStation3",
      icon: "weatherStation",
    },
    {
      position: {
        column: 2,
        row: 0,
      },
      id: "lakeFormation",
      droppable: true,
    },
    {
      position: {
        column: 3,
        row: 0,
      },
      id: "s3",
      droppable: true,
    },
    {
      position: {
        column: 2,
        row: 2,
      },
      id: "redshift",
      droppable: true,
    },
    {
      position: {
        column: 3,
        row: 2,
      },
      id: "forecast",
      droppable: true,
    },
    {
      position: {
        column: 5,
        row: 2,
      },
      id: "mobile1",
      icon: "mobile"
    },
    {
      position: {
        column: 5,
        row: 1,
      },
      id: "mobile2",
      icon: "mobile"
    },
    {
      position: {
        column: 5,
        row: 0,
      },
      id: "mobile3",
      icon: "mobile"
    },
  ],
  relations: [
    {
      sourceId: "weatherStation1",
      targetId: "lakeFormation",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "weatherStation2",
      targetId: "lakeFormation",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "weatherStation3",
      targetId: "lakeFormation",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "lakeFormation",
      targetId: "s3",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "s3",
      targetId: "redshift",
      sourceAnchor: "bottom",
      targetAnchor: "top",
    },
    {
      sourceId: "redshift",
      targetId: "forecast",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "forecast",
      targetId: "mobile1",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "forecast",
      targetId: "mobile2",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
    {
      sourceId: "forecast",
      targetId: "mobile3",
      sourceAnchor: "right",
      targetAnchor: "left",
    },
  ],
  awspalette: ["redshift", "forecast", "s3", "lakeFormation", "dynamodb", "lambdaTensorflow"],
  validator: level9Validator,
};

function level9Validator(state: LevelState): LevelFeedback {

  // needs to be correct
  if(state.lakeFormation === "s3" )
    return { correct: false, feedbackComponent: "Die rohen Daten kann man nicht ohne weiteres in einen S3 Bucket schreiben." };
  if(state.s3 === "redshift")
    return { correct: false, feedbackComponent: "Redshift hat keinen Data Lake worauf es Queries ausführen kann." };
  if(state.s3 === "dynamodb")
    return { correct: false, feedbackComponent: "Data Lakes können nicht in Datenbanken wie Dynamo erstellt werden." };
  if(state.redshift === "forecast")
    return { correct: false, feedbackComponent: "Queries auf Data Lakes sind ohne weitere Datenverarbeitung unmöglich!" };

  // possible:
  if (state.forecast === "lambdaTensorflow") {
    return {correct: true, stars: 2, feedbackComponent: "Gute Wahl, wenn Machine Learning den Mittelpunkt des Services darstellen soll. Es gibt aber anderse AWS Webservices, die diese Arbeit übernehmen." };
  }
  // perfect:
  if (state.lakeFormation === "lakeFormation" && state.s3 === "s3" && state.redshift === "redshift" && state.forecast === "forecast") {
    return {correct: true, stars: 3};
  }

  return {correct: false};
}

export default level9;
