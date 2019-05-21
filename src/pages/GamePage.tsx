import * as React from 'react';
import SplitPane from 'react-split-pane';

const css = require('./GamePage.css');

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  render() {
    return (
      <div>
        <SplitPane resizerClassName={css.splitPaneBorder} split="vertical" minSize="30%" defaultSize="50%">
          <div>Main window</div>
          <SplitPane resizerClassName={css.splitPaneBorder} split="horizontal" size="20%">
            <div>Selection part</div>
            <div>Explanation</div>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}