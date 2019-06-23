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
  description?: string;
}

export interface LevelRelation {
  sourceId: string;
  targetId: string;
  sourceAnchor?: AnchorPosition;
  targetAnchor?: AnchorPosition;
  doubleArrow?: boolean;
  dashed?: boolean;
}

export interface LevelPosition {
  row: number;
  rowSpan?: number;
  column: number;
  columnSpan?: number;
}

export type AnchorPosition = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left";

export type LevelState = Record<string, string>;

/**
 * LevelFeedback:
 *  correct: true wenn das Level (egal wie gut) richtig gelöst wurde
 *  points: wie viele Punkte der Spieler für seine Lösung bekommt    \
 *  maxPoints: die maximale punktzahl für das level (default: 100)    | <- nur relevant wenn correct = true
 *  stars: wie viele Sterne gefüllt werden, wenn nicht angegeben,    /
 *         dann anteil der punkte von den maximalen punkten, sonst alle 3
 *  feedbackComponent: component die als Tipp im dialog angezeigt wird,
 *                     für richtige und falsche lösungen
 */
export interface LevelFeedback {
  correct: boolean;
  points?: number;
  maxPoints?: number;
  stars?: 1 | 2 | 3;
  feedbackComponent?: JSX.Element | string;
}

/**
 * LevelValidator:
 *  LevelState: Objekt, in dem die für jede dropzone die id des darin
 *              liegenden aws produkts gespeichert ist
 *
 * je nach levelstate soll ein hilfreiches LevelFeedback generiert werden,
 * gerade bei richtigen aber nicht optimalen Lösungen soll ein tipp gegeben
 * werden, warum es nicht optimal ist
 */
export type LevelValidator = (state: LevelState) => LevelFeedback;
