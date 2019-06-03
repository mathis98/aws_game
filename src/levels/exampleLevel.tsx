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
      icon: "bnd"
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
      icon: "cam"
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "database",
    },
    {
      sourceId: "database",
      targetId: "bnd",
    }
  ],
  awspalette: ["s3"]
}

export const level2: Level = {
  columns: 5,
  rows: 6,
  gap: "1em",
  elements: [
    {
      position: {
        column: 1,
        row: 1
      },
      id: "camera",
      icon: "bnd"
    },
    {
      position: {
        column: 2,
        row: 2
      },
      id: "database1",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 3
      },
      id: "database2",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 4
      },
      id: "bnd",
      icon: "cam"
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "database1",
    },
    {
      sourceId: "camera",
      targetId: "database2",
    },
    {
      sourceId: "database1",
      targetId: "bnd",
    },
    {
      sourceId: "database2",
      targetId: "bnd",
    }
  ],
  awspalette: ["s3", "dynamodb"]
}
