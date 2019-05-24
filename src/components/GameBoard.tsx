import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';

const css = require('./GameBoard.css');

export interface GameBoardProps {
  level?: Level;
}

export interface Level{
  columns: number[] | number;
  rows: number[] | number;
  gap?: string;
  elements?: LevelElement[];
  relations?: LevelRelation[];
}

export interface LevelElement {
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


const exampleLevel: Level = {
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
      component: <h1>CAMERA</h1>,
    },
    {
      position: {
        column: 3,
        row: 3
      },
      id: "database",
      component: <h1>DATABASE</h1>
    }
  ],
  relations: [
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "top"
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "top-left",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "left",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "bottom-left",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "bottom",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "bottom-right",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "right",
    },
    {
      sourceId: "camera",
      targetId: "database",
      sourceAnchor: "bottom",
      targetAnchor: "top-right",
    }
  ]
}

const arrowStyle = {
  stroke: "black",
  strokeWidth: 6
}

interface GameBoardState {
  edges?: Edge[];
}


interface Edge {
  start: Point;
  end: Point;
  startNormal: Point;
  endNormal: Point;
}

interface Point {
  x: number;
  y: number;
}


export default class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
  elements: any;
  level: Level;

  constructor(props: Readonly<GameBoardProps>) {
    super(props);
    this.level = this.props.level || exampleLevel;
    this.elements = {};
    this.state = { edges: []};
    this.onResize = this.onResize.bind(this);
  }

  render() {
    var gridStyle = {
      gridTemplate: getFrStr(this.level.rows) + "/" + getFrStr(this.level.columns),
      gridGap: ((this.level.gap || 0) + " ").repeat(2)
    }

    return (
      // redraw on resize
      <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}>
        <div className={css.boardWrapper}>

          <div className={css.svgOverlay} key={"gameBoardSVG"} >
            <svg className={css.svg} >
              <defs>
                <marker id="arrow" markerWidth="5" markerHeight="4" refY="2" orient="auto">
                  <path d="M 0,0 L5,2 L0,4 z" fill="black" />
                </marker>
              </defs>
              {this.state.edges.map((edge, idx) => {
                return renderSVGEdge(edge, "edge" + idx);
              })}
            </svg>
          </div>

          <div className={css.board} style={gridStyle} key={"gameBoard"} >
            {this.level.elements.map(el => {
              this.elements[el.id] = React.createRef();
              var elementStyle = {
                gridColumn: (el.position.column + 1) + "/ span " + (el.position.columnSpan || 1),
                gridRow: (el.position.row + 1) + "/ span " + (el.position.rowSpan || 1)
              }
              return (
                <div key={el.id} className={css.boardElement} style={elementStyle}>
                  <div className={css.arrowTarget} ref={this.elements[el.id]} >
                    {el.component}
                  </div>
                </div>
                )
            })}
          </div>
        </div>
      </ReactResizeDetector>
    );
  }

  onResize() {
    // recalculate positions of edges
    var state: GameBoardState = { edges: [] };

    for (const relation of this.level.relations) {
      state.edges.push({
        start: calculateAnchorPoint(this.elements[relation.sourceId].current, relation.sourceAnchor),
        end: calculateAnchorPoint(this.elements[relation.targetId].current, relation.targetAnchor),
        startNormal: getNormal(relation.sourceAnchor),
        endNormal: getNormal(relation.targetAnchor),
      })
    }

    this.setState(state);
  }
}


// get the fractions as a string for the css property
function getFrStr(spec: number[] | number): string {
  if (spec instanceof Array) {
    return spec.map(el => el + "fr").join(" ");
  }
  return " 1fr".repeat(spec);
}


function renderSVGEdge(edge: Edge, key: string): JSX.Element {
  // get required space for arrow
  if (edge.endNormal.x && edge.endNormal.y) {
    edge.end.x += edge.endNormal.x * 5 * arrowStyle.strokeWidth * 0.707;
    edge.end.y += edge.endNormal.y * 5 * arrowStyle.strokeWidth * 0.707;
  } else {
    edge.end.x += edge.endNormal.x * 5 * arrowStyle.strokeWidth;
    edge.end.y += edge.endNormal.y * 5 * arrowStyle.strokeWidth;
  }

  // draw a bezier curve using the anchor normals
  const normalFactor = 150;
  const d = `M ${edge.start.x} ${edge.start.y}
             C ${edge.start.x + (edge.startNormal.x * normalFactor)} ${edge.start.y + (edge.startNormal.y * normalFactor)},
               ${edge.end.x + (edge.endNormal.x * normalFactor)} ${edge.end.y + (edge.endNormal.y * normalFactor)},
               ${edge.end.x} ${edge.end.y}`;

  return <path d={d} style={arrowStyle} fill="transparent" key={key} markerEnd="url(#arrow)" />;
}


export type AnchorPosition = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left";

function calculateAnchorPoint(elem: any, anchor: AnchorPosition ): Point {
  const x: number = elem.offsetLeft;
  const y: number = elem.offsetTop;
  const w: number = elem.clientWidth;
  const h: number = elem.clientHeight;
  const w2: number = Math.round(elem.clientWidth / 2);
  const h2: number = Math.round(elem.clientHeight / 2);

  switch (anchor) {
    case "top-left":
      return { x, y };
    case "top":
      return { x: x + w2, y };
    case "top-right":
      return { x: x + w, y };
    case "right":
      return { x: x + w, y: y + h2 };
    case "bottom-right":
      return { x: x + w, y: y + h };
    case "bottom":
      return { x: x + w2, y: y + h };
    case "bottom-left":
      return { x, y: y + h };
    case "left":
      return { x, y: y + h2 };
  }
}

function getNormal(anchor: AnchorPosition): Point {
  switch (anchor) {
    case "top-left":
      return { x: -1, y: -1 };
    case "top":
      return { x: 0, y: -1 };
    case "top-right":
      return { x: 1, y: -1 };
    case "right":
      return { x: 1, y: 0 };
    case "bottom-right":
      return { x: 1, y: 1 };
    case "bottom":
      return { x: 0, y: 1 };
    case "bottom-left":
      return { x: -1, y: 1 };
    case "left":
      return { x: -1, y: 0 };
  }
}

