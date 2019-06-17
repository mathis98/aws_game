import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Level, AnchorPosition, LevelRelation, LevelState } from 'levels/level';
import { allIcons } from 'levels/LevelElements';
import Droppable from 'components/dnd/Droppable';

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
  doubleArrow?: boolean;
  dashed?: boolean;
}

interface Point {
  x: number;
  y: number;
}

const arrowStyle = {
  stroke: "black",
  strokeWidth: 3
}

const dashedArrowStyle = Object.assign({
  strokeDasharray: 6
}, arrowStyle);

export default class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
  elements: Record<string, any>;
  droppables: Record<string, any>;

  constructor(props: Readonly<GameBoardProps>) {
    super(props);
    this.elements = {};
    this.state = { edges: []};
    this.onResize = this.onResize.bind(this);

    this.droppables = {};

    // create droppable components
    for (let el of this.props.level.elements || []) {
      if (el.droppable) {
        this.droppables[el.id] = <Droppable data={{ id: el.id, child: {} }} />;
      }
    }
  }

  shouldComponentUpdate(props: GameBoardProps, state: GameBoardState) {
    if(this.props != props) return false;
    return true;
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
            <marker id="arrowBack" markerWidth="5" markerHeight="4" refY="2" orient="auto-start-reverse">
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

            let component;
            if (el.droppable) {
              component = this.droppables[el.id];
            } else if (el.icon) {
              component = allIcons[el.icon];
            } else {
              throw "At least one of the properties 'droppable', 'icon' must be set!";
            }

            return (
              <div key={el.id} className={css.boardElement} style={elementStyle}>
                <div className={css.arrowTarget} ref={this.elements[el.id]} >
                  {component}
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

      completeAnchors(source, target, relation);

      state.edges.push({
        start: calculateAnchorPoint(source, relation.sourceAnchor),
        end: calculateAnchorPoint(target, relation.targetAnchor),
        startNormal: getNormal(relation.sourceAnchor),
        endNormal: getNormal(relation.targetAnchor),
        doubleArrow: relation.doubleArrow,
        dashed: relation.dashed
      })
    }

    this.setState(state);
  }

  // get the state of the dropzones (the id of the draggable child)
  getState(): LevelState {
    const state: LevelState = {};
    for (const droppableID of Object.keys(this.droppables)) {
      const data = this.droppables[droppableID].props.data;
      if (data && data.child && data.child.id && !data.child.hide) {
        state[droppableID] = data.child.id;
      } else {
        state[droppableID] = undefined;
      }
    }
    return state;
  }
}


// get the fractions as a string for the css property
function getFrStr(spec: number[] | number): string {
  if (spec instanceof Array) {
    return spec.map(el => el + "fr").join(" ");
  }
  return " 1fr".repeat(spec);
}

// auto complete missing anchor points by minimizing the distance
function completeAnchors(source: any, target: any, relation: LevelRelation): void {
  const allAnchors: AnchorPosition[] = ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"];
  var minDist = Infinity;
  var bestSourceAnchor: AnchorPosition;
  var bestTargetAnchor: AnchorPosition;
  for (const sourceAnchor of (relation.sourceAnchor && [relation.sourceAnchor]) || allAnchors) {
    for (const targetAnchor of (relation.targetAnchor && [relation.targetAnchor]) || allAnchors) {
      const dist = distance(calculateAnchorPoint(source, sourceAnchor), calculateAnchorPoint(target, targetAnchor));
      if (dist < minDist) {
        minDist = dist;
        bestSourceAnchor = sourceAnchor;
        bestTargetAnchor = targetAnchor;
      }
    }
  }
  relation.sourceAnchor = bestSourceAnchor;
  relation.targetAnchor = bestTargetAnchor;
}

// build the svg path of an edge
function renderSVGEdge(edge: Edge, key: string): JSX.Element {
  // get required space for arrow
  if (edge.endNormal.x && edge.endNormal.y) {
    edge.end.x += edge.endNormal.x * 5 * arrowStyle.strokeWidth * 0.707;
    edge.end.y += edge.endNormal.y * 5 * arrowStyle.strokeWidth * 0.707;
  } else {
    edge.end.x += edge.endNormal.x * 5 * arrowStyle.strokeWidth;
    edge.end.y += edge.endNormal.y * 5 * arrowStyle.strokeWidth;
  }

  if (edge.doubleArrow) {
    // get required space for back arrow
    if (edge.startNormal.x && edge.startNormal.y) {
      edge.start.x += edge.startNormal.x * 5 * arrowStyle.strokeWidth * 0.707;
      edge.start.y += edge.startNormal.y * 5 * arrowStyle.strokeWidth * 0.707;
    } else {
      edge.start.x += edge.startNormal.x * 5 * arrowStyle.strokeWidth;
      edge.start.y += edge.startNormal.y * 5 * arrowStyle.strokeWidth;
    }
  }

  const a1 = edge.start.x;
  const a2 = edge.start.y;
  const b1 = edge.end.x;
  const b2 = edge.end.y;

  const v1 = edge.startNormal.x;
  const v2 = edge.startNormal.y;
  const w1 = edge.endNormal.x;
  const w2 = edge.endNormal.y;

  // calculate the intersection of the 2 lines
  const s = (v2 * (b1 - a1) + a2 * v1 - b2 * v1) / (v1 * w2 - v2 * w1); // magic

  let d;

  if (!isNaN(s) && isFinite(s)) {
    // an intersection exists
    d = `M ${edge.start.x} ${edge.start.y}
         L ${edge.end.x + s * edge.endNormal.x} ${edge.end.y + s * edge.endNormal.y},
           ${edge.end.x} ${edge.end.y}`;
  } else {
    // lines are parallel, fall back to direct connection
    d = `M ${edge.start.x} ${edge.start.y}
         L ${edge.end.x} ${edge.end.y}`;
  }

  const style = edge.dashed ? dashedArrowStyle : arrowStyle;
  const endMarker = edge.doubleArrow ? "url(#arrowBack)" : null;

  return <path d={d} style={style} fill="transparent" key={key} markerEnd="url(#arrow)" markerStart={endMarker} />;
}

// get the concrete position of an elements anchor point
function calculateAnchorPoint(elem: any, anchor: AnchorPosition ): Point {
  const x: number = elem.offsetLeft;
  const y: number = elem.offsetTop;
  const w: number = elem.clientWidth;
  const h: number = elem.clientHeight;
  const w2: number = elem.clientWidth / 2;
  const h2: number = elem.clientHeight / 2;

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

// get the normal vector of an anchor
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

// calculate the distance between twoo points
function distance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
