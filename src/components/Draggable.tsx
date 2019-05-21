import * as React from 'react';
const css = require('../global.css');

import { DragSource, ConnectDragSource } from 'react-dnd';
import Typography from '@material-ui/core/Typography';

const types = {
  ITEM: 'draggable'
}

const itemSource = {
  beginDrag(props: any) {
    return {id:props.id}
  },
  endDrag(props: any) {
    /* code here */
  }
}

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export interface DraggableProps {
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
  id: string;
}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Draggable extends React.Component<DraggableProps, {}> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource (
      <div style={{opacity: isDragging ? 0 : 1, cursor: isDragging ? 'grabbing' : ''}} className={css.draggable}>
      </div>
    );
  }
}

export default DragSource(types.ITEM, itemSource, collect) (Draggable);
