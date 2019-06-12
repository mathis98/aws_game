import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';



export default class DynamicDnDProvider extends React.Component<{}, {}> {
  render() {
    if (isMobile) {
      return (
        <DragDropContextProvider backend={TouchBackend as any}>
          {this.props.children}
        </DragDropContextProvider>
      )
    } else {
      return (
        <DragDropContextProvider backend={HTML5Backend}>
          {this.props.children}
        </DragDropContextProvider>
      )
    }
  }
}
