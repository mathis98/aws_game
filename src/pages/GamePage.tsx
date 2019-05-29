import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';
import MarkdownViewer from 'components/MarkdownViewer';

import exampleLevel from 'levels/exampleLevel';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { Level, getState } from 'levels/level';

const css = require('./GamePage.css');

const { default: s3Md } = require("level_data/services_desc/s3.md");

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  level: Level;

  constructor(props: GamePageProps) {
    super(props);
    this.level = exampleLevel;
    this.checkLevel = this.checkLevel.bind(this);
  }

  render() {
    return (
      <div>
        <Popup />
        <DragDropContextProvider backend={HTML5Backend}>
        <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={33}>
          <SplitterPanel className={css.gridBackground} >
            <GameBoard level={this.level} />
            <Fab variant="extended" color="primary" className={css.startButton} onClick={this.checkLevel} >
              <Icon>play_circle_outline</Icon>&nbsp;&nbsp;Abgabe
            </Fab>
          </SplitterPanel>
          <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25} secondaryInitialSize={40}>
            <SplitterPanel>
              Components
            </SplitterPanel>
            <SplitterPanel>
              <MarkdownViewer source={s3Md} />
            </SplitterPanel>
          </SplitterLayout>
        </SplitterLayout>
        </DragDropContextProvider>
      </div>
    );
  }

  checkLevel() {
    const state: any = getState(this.level);
    if (state["database"] === "s3") {
      alert("Richtig!")
    } else {
      alert("Da fehlt noch was!")
    }
  }
}
