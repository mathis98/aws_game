import { Level } from './level';
import { ExactMatchValidator } from './DefaultValidators';

const level7: Level = {
  columns: 5,
  rows: 5,
  gap: "1em",
  elements: [],
  awspalette: ["s3"],
  validator: ExactMatchValidator({ database: "s3" })
}

export default level7;