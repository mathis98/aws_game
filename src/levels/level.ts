import { IconLevelElement, AWSProductLevelElement } from "levels/LevelElements";

export interface Level {
  columns: number[] | number;
  rows: number[] | number;
  gap?: string;
  elements?: LevelElement[];
  relations?: LevelRelation[];
  awspalette: AWSProductLevelElement[];
}

export interface LevelElement {
  id: string;
  position: LevelPosition;
  droppable?: boolean;     // <-  one of these
  icon?: IconLevelElement; // <-  must be set
}

export interface LevelRelation {
  sourceId: string;
  targetId: string;
  sourceAnchor?: AnchorPosition;
  targetAnchor?: AnchorPosition;
  doubleArrow?: boolean;
}

export interface LevelPosition {
  row: number;
  rowSpan?: number;
  column: number;
  columnSpan?: number;
}

export type AnchorPosition = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left";
