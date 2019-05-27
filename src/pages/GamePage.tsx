import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import GameBoard from 'components/GameBoard';
import SplitterPanel from 'components/SplitterPanel';

import exampleLevel from 'levels/exampleLevel';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const css = require('./GamePage.css');

export interface GamePageProps {}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  render() {
    return (
      <div>
        <Popup />
        <DragDropContextProvider backend={HTML5Backend}>
        <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={33}>
          <SplitterPanel className={css.gridBackground} >
            <GameBoard level={exampleLevel} />
          </SplitterPanel>
          <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25} secondaryInitialSize={40}>
            <SplitterPanel>
              Components
            </SplitterPanel>
            <SplitterPanel>
              Info
            </SplitterPanel>
          </SplitterLayout>
        </SplitterLayout>
        </DragDropContextProvider>
      </div>
    );
  }
}
