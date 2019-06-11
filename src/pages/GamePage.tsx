import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import InstructionsPopup from 'components/InstructionsPopup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';
import MarkdownViewer from 'components/MarkdownViewer';
import levels from 'levels/levels'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Level, LevelFeedback } from 'levels/level';
import { allAWSProducts } from 'levels/LevelElements';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'
import GamePageSnackbar from 'components/GamePageSnackbar';
import FeedbackPopup from 'components/FeedbackPopup';
import ErrorPage from 'pages/ErrorPage'


const css = require('./GamePage.css');

export interface MatchParams {
  levelId: string;
}

export interface GamePageProps extends RouteComponentProps<MatchParams> {
}

export interface GamePageState {
  currentInfoId?: string;
  currentInfoMd?: string;
  showSnackbar?: boolean;
  feedback?: LevelFeedback;
  showFeedback?: boolean;
}

class GamePage extends React.Component<GamePageProps, GamePageState> {
  levelId: number;
  level: Level;
  levelInfoMd: string;
  gameBoardRef: any;

  constructor(props: GamePageProps) {
    super(props);

    this.levelId = Number(this.props.match.params.levelId);

    this.levelInfoMd = require(`level_data/level_${this.levelId}/popup.md`).default;
    this.level = levels[this.levelId - 1];
    this.checkLevel = this.checkLevel.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.state = {currentInfoMd: this.levelInfoMd};
    this.gameBoardRef = React.createRef();
  }

  render() {
    if (isNaN(this.levelId) || this.levelId - 1 > levels.length) {
      return <ErrorPage />
    }

    return (
      <div>
        <InstructionsPopup instructionsMd={this.levelInfoMd} />
        <FeedbackPopup open={this.state.showFeedback} feedback={this.state.feedback} onClose={() => this.setState({showFeedback: false})} />
        <GamePageSnackbar open={this.state.showSnackbar} onClose={() => this.setState({ showSnackbar: false })}
                          message="Es gibt noch leere Felder! Fülle alle Felder bevor du abgibst."
        />
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

export default withRouter(GamePage);
