import * as React from 'react';
import { ArcherContainer, ArcherElement, Relation } from 'react-archer';
import ReactResizeDetector from 'react-resize-detector';

const css = require('./GameBoard.css');

export interface GameBoardProps {
  level?: Level;
}

export interface Level{
  columns: number[] | number;
  rows: number[] | number;
  gap: string;
  elements: LevelElement[];
}

export interface LevelElement {
  component: React.ReactNode;
  id: string;
  position: LevelPosition;
  relations?: Relation[];
}

export interface LevelPosition {
  row: number;
  rowSpan?: number;
  column: number;
  columnSpan?: number;
}

const exampleLevel: Level = {
  columns: 3,
  rows: 3,
  gap: "1em",
  elements: [
    {
      position: {
        column: 0,
        row: 0
      },
      id: "camera",
      component: <h1>CAMERA</h1>,
      relations: [
        {
          targetId: "database",
          targetAnchor: "left",
          sourceAnchor: "bottom"
        }
      ]
    },
    {
      position: {
        column: 1,
        row: 1
      },
      id: "database",
      component: <h1>DATABASE</h1>,
      relations: [
        {
          targetId: "consumer",
          targetAnchor: "left",
          sourceAnchor: "bottom"
        }
      ]
    },
    {
      position: {
        column: 2,
        row: 2
      },
      id: "consumer",
      component: <h1>CONSUMER</h1>
    }
  ]
}

export default class GameBoard extends React.Component<GameBoardProps, any> {
  render() {
    const l = this.props.level || exampleLevel;

    var gridStyle = {
      gridTemplate: getFrStr(l.rows) + "/" + getFrStr(l.columns),
      gridGap: l.gap + " " + l.gap
    }
    console.log(gridStyle);

    return (
      // redraw on resize because the react-archer library is buggy sometimes
      <ReactResizeDetector handleWidth handleHeight>
        <ArcherContainer strokeColor="black" strokeWidth={5} arrowLength={5} arrowThickness={3} className={css.fullSize} >
          <div className={css.board} style={gridStyle} >

            {l.elements.map(el => {

              var elementStyle = {
                gridColumn: (el.position.column + 1) + "/ span " + (el.position.columnSpan || 1),
                gridRow: (el.position.row + 1) + "/ span " + (el.position.rowSpan || 1)
              }

              return (
                <div className={css.boardElement} style={elementStyle}>
                  <ArcherElement id={el.id} relations={el.relations} >
                    <div className={css.arrowTarget}>
                      {el.component}
                    </div>
                  </ArcherElement>
                </div>
                )
            })}
          </div>
        </ArcherContainer>
      </ReactResizeDetector>
    );
  }
}

// get the fractions as a string for the css property
function getFrStr(spec: number[] | number): string {
  if (spec instanceof Array) {
    return spec.map(el => el + "fr").join(" ");
  }
  return " 1fr".repeat(spec);
}
