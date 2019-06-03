import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';
import MarkdownViewer from 'components/MarkdownViewer';
import Draggable from 'components/dnd/Draggable';

import exampleLevel from 'levels/exampleLevel';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Level, getState } from 'levels/level';

const css = require('./GamePage.css');

const { default: s3Md } = require("level_data/services_desc/s3.md");
const { default: popup } = require("level_data/level_1/popup.md");

var source = popup;

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, any> {
  level: Level;

  private Markdown = React.createRef<MarkdownViewer>();

  showDesc = (id:string) => {
    source = id == '' ? popup : require(`level_data/services_desc/${id}.md`).default;
    this.setState({shown: id, source: source});
  }

  constructor(props: GamePageProps) {
    super(props);
    this.level = exampleLevel;
    this.checkLevel = this.checkLevel.bind(this);
    this.state = {shown: '', source: source};
  }

  render() {
    return (
      <div>
        <Popup />
        <DragDropContextProvider backend={HTML5Backend}>
        <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={30}>
          <SplitterPanel className={css.gridBackground} >
            <GameBoard level={this.level} />
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
                  {exampleLevel.draggables.map((draggable: any)=> {
                    return <Draggable data={draggable} key={draggable.id} showMe={this.showDesc} shown={this.state.shown} />
                  })}
                </div>
              </div>
            </SplitterPanel>
            <SplitterPanel>
              <MarkdownViewer source={this.state.source}/>
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
