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
      // btw was that intentional?
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
      // hmm
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
        column: 0,
        row: 0
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
        row: 5
      },
      id: "bnd",
      icon: "cam"
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "database1",
        sourceAnchor: "right"
    },
    {
      sourceId: "camera",
      targetId: "database2",
        targetAnchor: "left"
    },
    {
      sourceId: "database1",
      targetId: "bnd",
        sourceAnchor: "right",
        targetAnchor: "top"
    },
    {
      sourceId: "database2",
      targetId: "bnd",
    }
  ],
  awspalette: ["s3", "dynamodb"]
}
