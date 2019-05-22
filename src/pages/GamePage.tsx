import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';

const css = require('./GamePage.css');

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  render() {
    return (
      <div>
        <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={33}>
          <div>Main</div>
          <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25} secondaryInitialSize={40}>
            <div>Components</div>
            <div>Description</div>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    );
  }
}
