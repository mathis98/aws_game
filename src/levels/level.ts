import { DroppableType } from "components/dnd/Droppable";

export interface Level {
  columns: number[] | number;
  rows: number[] | number;
  gap?: string;
  elements?: LevelElement[];
  relations?: LevelRelation[];
}

export interface LevelElement {
  droppable?: boolean;
  component: React.ReactNode;
  id: string;
  position: LevelPosition;
}

export interface LevelRelation {
  sourceId: string;
  targetId: string;
  sourceAnchor: AnchorPosition;
  targetAnchor: AnchorPosition;
}

export interface LevelPosition {
  row: number;
  rowSpan?: number;
  column: number;
  columnSpan?: number;
}

export type AnchorPosition = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left";

// returns a map from droppable ids with the ids of the containing elements
export function getState(level: Level) {
  const result: any = {};
  if (level.elements) {
    level.elements.filter(el => el.droppable).forEach(el => {
      const dropEl = <DroppableType> el.component;
      if (dropEl.props.data.child && !dropEl.props.data.child.hide) {
        result[el.id] = dropEl.props.data.child.id;
      } else {
        result[el.id] = undefined;
      }
    });
  }
  return result;
}
