import { IconLevelElement, AWSProductLevelElement } from "levels/LevelElements";

export interface Level {
  columns: number[] | number;
  rows: number[] | number;
  gap?: string;
  elements?: LevelElement[];
  relations?: LevelRelation[];
  awspalette: AWSProductLevelElement[];
  validator: LevelValidator;
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
}

export interface LevelPosition {
  row: number;
  rowSpan?: number;
  column: number;
  columnSpan?: number;
}

export type AnchorPosition = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left";

export type LevelState = Record<string, string>;

export interface LevelFeedback {
  correct: boolean;
  points?: number;
  maxPoints?: number;
  stars?: 0 | 1 | 2 | 3;
  feedbackComponent?: JSX.Element;
}

export type LevelValidator = (state: LevelState) => LevelFeedback;
