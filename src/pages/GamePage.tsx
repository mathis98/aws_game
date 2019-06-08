import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';
import MarkdownViewer from 'components/MarkdownViewer';
import { level1 } from 'levels/level1';
import { level2 } from 'levels/level2';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Level } from 'levels/level';
import { allAWSProducts } from 'levels/LevelElements';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import GamePageSnackbar from 'components/GamePageSnackbar';

const css = require('./GamePage.css');

const { default: popup } = require("level_data/level_1/popup.md");

export interface GamePageProps {}

export interface GamePageState {
  currentInfoId?: string;
  currentInfoMd?: string;
  showSnackbar?: boolean;
}


// use <any, any> so withRouter() works
class GamePage extends React.Component<any, any> {
  level: Level;
  defaultInfo: string;
  gameBoardRef: any;

  constructor(props: GamePageProps) {
    super(props);
    this.level = level1;
    //this.level = level2; //load level 2 at start (comment line above)
    this.defaultInfo = popup;
    this.checkLevel = this.checkLevel.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.state = {currentInfoMd: this.defaultInfo};
    this.gameBoardRef = React.createRef();
  }

  render() {
    return (
      <div>
        <Popup />
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
      state.currentInfoMd = this.defaultInfo;
    }
    this.setState(state);
  }

  checkLevel() {
    if (this.gameBoardRef && this.gameBoardRef.current) {
      const state = this.gameBoardRef.current.getState();
      console.log("State of level:", state);

      // show snackbar if some empty dropzones exist
      for (let key in state) {
        if (state[key] === undefined) {
          this.setState({ showSnackbar: true });
          return;
        }
      }

      console.log(this.level.validator(state));
    }
  }
}

export default withRouter(GamePage);
