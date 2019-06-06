import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';
import MarkdownViewer from 'components/MarkdownViewer';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Level } from 'levels/level';
import { allAWSProducts } from 'levels/LevelElements';
import Tooltip from '@material-ui/core/Tooltip';
import levels from 'levels/levels'
import { RouteComponentProps } from 'react-router'
import { ErrorPage } from 'pages/ErrorPage'

const css = require('./GamePage.css');

const { default: popup } = require("level_data/level_1/popup.md");

export interface MatchParams {
  levelId: string;
}

export interface GamePageProps extends RouteComponentProps<MatchParams> {
}

export interface GamePageState {
  currentInfoId?: string;
  currentInfoMd?: string;
}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, GamePageState> {
  level: Level;
  defaultInfo: string;
  gameBoardRef: any;

  constructor(props: GamePageProps) {
    super(props);

    this.level = levels[Number(this.props.match.params.levelId) - 1];

    this.defaultInfo = popup;
    this.checkLevel = this.checkLevel.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.state = {currentInfoMd: this.defaultInfo};
    this.gameBoardRef = React.createRef();
  }

  render() {
    const levelId = this.props.match.params.levelId;
    if (isNaN(Number(levelId)) || Number(levelId) - 1 > levels.length) {
      return <ErrorPage />
    }

    return (
      <div>
        <Popup />
        <DragDropContextProvider backend={HTML5Backend}>
        <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={30}>
          <SplitterPanel className={css.gridBackground} >
            <GameBoard level={this.level} ref={this.gameBoardRef} />
            <Fab variant="extended" color="primary" className={css.startButton} onClick={this.checkLevel} >
              <Icon>play_circle_outline</Icon>&nbsp;&nbsp;Abgabe
            </Fab>
          </SplitterPanel>
          <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25} secondaryInitialSize={50}>
            <SplitterPanel>
              <div className={css.sidebar_upper}>
                <Typography variant="h5" gutterBottom className={css.service_header}>
                  Services
                </Typography>
                <div className={css.draggable_wrapper}>
                    {this.level.awspalette.map(product => {
                      const el = allAWSProducts[product];
                      return React.cloneElement(el, { infoCallback: this.showInfo });
                    })}
                </div>
              </div>
            </SplitterPanel>
            <SplitterPanel>
              <MarkdownViewer source={this.state.currentInfoMd} />
              {this.state.currentInfoId &&
              <Tooltip title="Zurück">
                <Fab color="primary" className={css.infoResetButton} onClick={() => this.showInfo("")}>
                  <Icon>undo</Icon>
                </Fab>
              </Tooltip>}
            </SplitterPanel>
          </SplitterLayout>
        </SplitterLayout>
        </DragDropContextProvider>
      </div>
    );
  }

  showInfo(infoId: string) {
    const state: GamePageState = {currentInfoId: infoId};
    if (infoId) {
      state.currentInfoMd = require(`level_data/services_desc/${infoId}.md`).default;
    } else {
      state.currentInfoMd = this.defaultInfo;
    }
    this.setState(state);
  }

  checkLevel() {
    if (this.gameBoardRef && this.gameBoardRef.current) {
      console.log("State of level:", this.gameBoardRef.current.getState());
    }
  }
}
