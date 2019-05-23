import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';

const css = require('./GamePage.css');

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  render() {
    return (
      <div>
        <Popup />
        <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={33}>

          <GameBoard />

          <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25} secondaryInitialSize={40}>
            <div>Components</div>
            <div>Description</div>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    );
  }
}
