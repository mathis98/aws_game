import * as React from 'react';
import Draggable from 'components/dnd/Draggable';
import Droppable from 'components/dnd/Droppable';


var draggables: any = [
  {
    'id': 'a',
    'component': <h1>S3</h1>
  },
  {
    'id': 'b',
    'component': <h1>DynamoDB</h1>
  }
]

var droppables: any = [
  {
    'id': 'zone1',
    'child': {}
  },
  {
    'id': 'zone2',
    'child': {}
  }
]

const exampleLevel: Level = {
  columns: 6,
  rows: 5,
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
        column: 2,
        row: 2
      },
      id: "database",
      component: <Droppable data={droppables[0]} />
    },
    {
      position: {
        column: 4,
        row: 3
      },
      id: "client",
      component: <h1>CLIENT</h1>
    },
    {
      position: {
        column: 3,
        row: 2
      },
      id: "database2",
      component: <Droppable data={droppables[1]} />
    },
    {
      position: {
        column: 4,
        row: 0
      },
      id: "S3",
      component: <Draggable data={draggables[0]} />
    },
    {
      position: {
        column: 3,
        row: 0
      },
      id: "DynamoDB",
      component: <Draggable data={draggables[1]} />
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "left"
    },
    {
      sourceId: "database2",
      targetId: "client",
      sourceAnchor: "right",
      targetAnchor: "top"
    },
    {
      sourceId: "database",
      targetId: "database2",
      sourceAnchor: "right",
      targetAnchor: "left"
    }
  ]
}

export default exampleLevel;
