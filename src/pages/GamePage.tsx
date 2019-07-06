import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import InstructionsPopup from 'components/InstructionsPopup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';
import MarkdownViewer from 'components/MarkdownViewer';
import {LEVELS} from 'levels/levels'
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';
import TouchBackend from 'react-dnd-touch-backend';
import { PlayCircleOutline as PlayCircleOutlineIcon, Undo as UndoIcon } from '@material-ui/icons'
import { Fab, Typography, Tooltip } from '@material-ui/core';
import { Level, LevelFeedback } from 'levels/level';
import { allAWSProducts } from 'levels/LevelElements';
import GamePageSnackbar from 'components/GamePageSnackbar';
import FeedbackPopup from 'components/FeedbackPopup';
import ErrorPage from 'pages/ErrorPage'


const css = require('./GamePage.css');

export interface GamePageProps {
  levelId: number;
}

export interface GamePageState {
  currentInfoId?: string;
  currentInfoMd?: string;
  showSnackbar?: boolean;
  feedback?: LevelFeedback;
  showFeedback?: boolean;
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {
  level: Level;
  levelInfoMd: string;
  gameBoardRef: any;

  constructor(props: GamePageProps) {
    super(props);

    this.levelInfoMd = require(`level_data/level_${this.props.levelId}/popup.md`).default;
    this.level = LEVELS[this.props.levelId - 1];
    this.checkLevel = this.checkLevel.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.state = {currentInfoMd: this.levelInfoMd};
    this.gameBoardRef = React.createRef();
  }

  render() {
    if (this.props.levelId - 1 > LEVELS.length) {
      return <ErrorPage />
    }

    return (
      <div>
        <InstructionsPopup instructionsMd={this.levelInfoMd} />
        <FeedbackPopup open={this.state.showFeedback} feedback={this.state.feedback} onClose={() => this.setState({showFeedback: false})} levelId={this.props.levelId} />
        <GamePageSnackbar open={this.state.showSnackbar} onClose={() => this.setState({ showSnackbar: false })}
                          message="Es gibt noch leere Felder! Fülle alle Felder bevor du abgibst."
        />
        <DndProvider backend={isMobile ? (TouchBackend as any) : HTML5Backend}>
          <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={30}>
            <SplitterPanel className={css.gridBackground} >
              <GameBoard level={this.level} ref={this.gameBoardRef} />
              <Fab variant="extended" color="primary" className={css.startButton} onClick={this.checkLevel} >
                <PlayCircleOutlineIcon/>&nbsp;&nbsp;Abgabe
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
                    <UndoIcon/>
                  </Fab>
                </Tooltip>}
              </SplitterPanel>
            </SplitterLayout>
          </SplitterLayout>
        </DndProvider>
      </div>
    );
  }

  showInfo(infoId: string) {
    const state: GamePageState = {currentInfoId: infoId};
    if (infoId) {
      state.currentInfoMd = require(`level_data/services_desc/${infoId}.md`).default;
    } else {
      state.currentInfoMd = this.levelInfoMd;
    }
    this.setState(state);
  }

  checkLevel() {
    if (this.gameBoardRef && this.gameBoardRef.current) {
      const state = this.gameBoardRef.current.getState();

      // show snackbar if some empty dropzones exist
      for (let key in state) {
        if (state[key] === undefined) {
          this.setState({ showSnackbar: true });
          return;
        }
      }

      this.setState({feedback: this.level.validator(state), showFeedback: true});
    }
  }
}
