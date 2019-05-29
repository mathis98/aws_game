import * as React from 'react';
import Draggable from 'components/dnd/Draggable';
import Droppable from 'components/dnd/Droppable';
import Standard from 'components/dnd/Standard';
import { Level } from './level';


var draggables: any = [
  {
    'id': 's3',
    'icon': 'S3',
    'text': 'S3',
    'component': <div><Standard icon='S3' text='S3' /></div>
  }
]

export var droppables: any = [
  {
    'id': 'slot1',
    'child': {}
  }
]

const exampleLevel: Level = {
  columns: 5,
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
      droppable: true,
      component: <Droppable data={droppables[0]} />
    },
    {
      position: {
        column: 3,
        row: 3
      },
      id: "bnd",
      component: <h1>BND</h1>
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
      sourceId: "database",
      targetId: "bnd",
      sourceAnchor: "bottom",
      targetAnchor: "left"
    }
  ],
  draggables: draggables
}

export default exampleLevel;
