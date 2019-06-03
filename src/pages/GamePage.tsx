import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';
import MarkdownViewer from 'components/MarkdownViewer';

import { level2 } from 'levels/exampleLevel';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Level } from 'levels/level';
import { allAWSProducts } from 'levels/LevelElements';

const css = require('./GamePage.css');

const { default: s3Md } = require("level_data/services_desc/s3.md");

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  level: Level;
  gameBoardRef: any;

  constructor(props: GamePageProps) {
    super(props);
    this.level = level2;
    this.checkLevel = this.checkLevel.bind(this);

    this.gameBoardRef = React.createRef();
  }

  render() {
    return (
      <div>
        <Popup />
        <DragDropContextProvider backend={HTML5Backend}>
        <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={33}>
          <SplitterPanel className={css.gridBackground} >
            <GameBoard level={this.level} ref={this.gameBoardRef} />
            <Fab variant="extended" color="primary" className={css.startButton} onClick={this.checkLevel} >
              <Icon>play_circle_outline</Icon>&nbsp;&nbsp;Abgabe
            </Fab>
          </SplitterPanel>
          <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25} secondaryInitialSize={40}>
            <SplitterPanel>
              <div className={css.sidebar_upper}>
                <Typography variant="h5" gutterBottom className={css.service_header}>
                  Services
                </Typography>
                <div className={css.draggable_wrapper}>
                    {this.level.awspalette.map(product => allAWSProducts[product])}
                </div>
              </div>

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
    if (this.gameBoardRef && this.gameBoardRef.current) {
      console.log("State of level:", this.gameBoardRef.current.getState());
    }
  }
}
