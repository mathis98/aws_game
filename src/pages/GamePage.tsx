import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';

const css = require('./GamePage.css');

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  render() {
    return (
      <div className={css.hmm}>
        <SplitterLayout customClassName={css.mainSplitter} percentage primaryMinSize={25} secondaryMinSize={10}>
          <div>Main</div>
          <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25}>
            <div>Components</div>
            <div>Description</div>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    );
  }
}
