import * as React from 'react';
import SplitterLayout from 'react-splitter-layout';
import Popup from 'components/Popup';
import '!style-loader!css-loader!./SplitterLayoutCustom.css';
import Draggable from '../components/dnd/Draggable';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Typography from '@material-ui/core/Typography';

const css = require('./GamePage.css');

export interface GamePageProps {}

const draggables = [
  {
    id: 'a',
    text: 'S3',
    icon: 'S3'
  },
  {
    id: 'b',
    text: 'DynamoDB',
    icon: 'DynamoDB'
  }
]

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <Popup />
          <SplitterLayout customClassName={css.matchViewportHeight} percentage primaryMinSize={25} secondaryMinSize={10} secondaryInitialSize={25}>
            <div>Main</div>
            <SplitterLayout vertical percentage primaryMinSize={25} secondaryMinSize={25} secondaryInitialSize={40}>
              <div className={css.sidebar_upper}>
                <Typography variant="h5" gutterBottom className={css.service_header}>
                  Services
                </Typography>
                <div className={css.draggable_wrapper}>
                  {draggables.map(draggable => {
                    return <Draggable data={draggable} key={draggable.id} />
                  })}
                </div>
              </div>
              <div>Description</div>
            </SplitterLayout>
          </SplitterLayout>
        </div>
      </DragDropContextProvider>
    );
  }
}
