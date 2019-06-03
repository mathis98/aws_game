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
  },
  {
    'id': 's4',
    'icon': 'S3',
    'text': 'S4',
    'component': <div><Standard icon='S3' text='S4' /></div>
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
      component: <img style={{ borderRadius: 6, WebkitUserDrag: "none"}} height="200px" width="200px" src={require('../../assets/img/Cam.svg')} alt={"BND"}/>,
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
      component: <img style={{ borderRadius: 6, WebkitUserDrag: "none"}} height="200px" width="200px" src={require('../../assets/img/BND.svg')} alt={"BND"}/>
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
