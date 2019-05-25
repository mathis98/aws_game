import * as React from 'react';

const exampleLevel: Level = {
  columns: 7,
  rows: 7,
  gap: "1em",
  elements: [
    {
      position: {
        column: 1,
        row: 1
      },
      id: "camera",
      component: <h1>CAMERA</h1>,
    },
    {
      position: {
        column: 5,
        row: 1
      },
      id: "database1",
      component: <h1>DATABASE1</h1>
    },
    {
      position: {
        column: 1,
        row: 5
      },
      id: "database2",
      component: <h1>DATABASE2</h1>
    },
    {
      position: {
        column: 3,
        row: 0
      },
      id: "database3",
      component: <h1>DATABASE3</h1>
    },
    {
      position: {
        column: 5,
        row: 5
      },
      id: "database",
      component: <h1>DATABASE4</h1>
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "top"
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "top-left",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "left",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "bottom-left",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "bottom",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "bottom-right",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "right",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "top-right",
    }
  ]
}

export default exampleLevel;
