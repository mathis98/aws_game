import { Level } from './level';
import { ExactMatchValidator } from './DefaultValidators';

const level8: Level = {
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
      id: "bpol",
      icon: "bpol"
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
      targetId: "bpol",
      sourceAnchor: "bottom",
      targetAnchor: "left"
    }
  ],
  awspalette: ["s3"],
  validator: ExactMatchValidator({ database: "s3" })
}

export default level8;