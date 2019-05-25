declare interface Level {
  columns: number[] | number;
  rows: number[] | number;
  gap?: string;
  elements?: LevelElement[];
  relations?: LevelRelation[];
}

declare interface LevelElement {
  component: React.ReactNode;
  id: string;
  position: LevelPosition;
}

declare interface LevelRelation {
  sourceId: string;
  targetId: string;
  sourceAnchor: AnchorPosition;
  targetAnchor: AnchorPosition;
}

declare interface LevelPosition {
  row: number;
  rowSpan?: number;
  column: number;
  columnSpan?: number;
}

declare type AnchorPosition = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left";
