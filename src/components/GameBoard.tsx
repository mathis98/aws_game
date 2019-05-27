import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';

const css = require('./GameBoard.css');

export interface GameBoardProps {
  level: Level;
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

const arrowStyle = {
  stroke: "black",
  strokeWidth: 3
}

export default class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
  elements: Record<string, any>;

  constructor(props: Readonly<GameBoardProps>) {
    super(props);
    this.elements = {};
    this.state = { edges: []};
    this.onResize = this.onResize.bind(this);
  }

  render() {
    var gridStyle = {
      gridTemplate: getFrStr(this.props.level.rows) + "/" + getFrStr(this.props.level.columns),
      gridGap: ((this.props.level.gap || 0) + " ").repeat(2)
    }

    return (
      // redraw on resize
      <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} >

        <svg className={css.svgOverlay} key="gameBoardSVG" >
          <defs>
            <marker id="arrow" markerWidth="5" markerHeight="4" refY="2" orient="auto">
              <path d="M 0,0 L5,2 L0,4 z" fill="black" />
            </marker>
          </defs>
          {this.state.edges.map((edge, idx) => renderSVGEdge(edge, "edge" + idx))}
        </svg>

        <div className={css.board} style={gridStyle} key="gameBoard" >
          {this.props.level.elements.map(el => {
            this.elements[el.id] = React.createRef();
            const elementStyle = {
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
      </ReactResizeDetector>
    );
  }

  onResize() {
    // recalculate positions of edges
    const state: GameBoardState = { edges: [] };

    for (const relation of this.props.level.relations) {
      const source = this.elements[relation.sourceId].current;
      const target = this.elements[relation.targetId].current;
      state.edges.push({
        start: calculateAnchorPoint(source, relation.sourceAnchor),
        end: calculateAnchorPoint(target, relation.targetAnchor),
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
