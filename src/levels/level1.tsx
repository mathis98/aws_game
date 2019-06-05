import { Level } from './level';

export const level1: Level = {
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
      icon: "cam"
    },
    {
      position: {
        column: 2,
        row: 2
      },
      id: "database",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 3
      },
      id: "bnd",
      icon: "bnd"
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
  awspalette: ["s3"]
}
