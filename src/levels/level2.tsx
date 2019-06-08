import { Level } from './level';
import { ExactMatchValidator } from './DefaultValidators';

export const level2: Level ={
    columns: 6,
  rows: 6,
  gap: "1em",
  elements: [
    {
      position: {
        column: 1,
        row: 1
      },
      id: "camera",
      icon: "camera"
    },
    {
      position: {
        column: 1,
        row: 4
      },
      id: "documents",
      icon: "documents"
    },
    {
      position: {
        column: 2,
        row: 2
      },
      id: "S3",
      droppable: true
    },
    {
      position: {
        column: 2,
        row: 3
      },
      id: "dynamo",
      droppable: true
    },
    {
      position: {
        column: 3,
        row: 4
      },
      id: "shop",
      icon: "shop"
    },
    {
      position: {
        column: 4,
        row: 4
      },
      id: "customer",
      icon: "customer"
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "S3",
      sourceAnchor: "bottom",
      targetAnchor: "left"
    },
    {
      sourceId: "documents",
      targetId: "dynamo",
      sourceAnchor: "top",
      targetAnchor: "left"
    },
    {
      sourceId: "dynamo",
      targetId: "shop",
      sourceAnchor: "right",
      targetAnchor: "top"
    },
    {
      sourceId: "S3",
      targetId: "customer",
      sourceAnchor: "right",
      targetAnchor: "top"
    },
    {
      sourceId: "S3",
      targetId: "shop",
      sourceAnchor: "right",
      targetAnchor: "top"
    }
  ],
  awspalette: ["s3", "dynamodb"],
  validator: ExactMatchValidator({ dynamo: "dynamodb", S3: "s3" })
}
