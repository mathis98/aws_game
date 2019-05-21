import * as React from 'react';
const css = require('./Draggable.css');

import { DragSource, ConnectDragSource } from 'react-dnd';
import Typography from '@material-ui/core/Typography';

const types = {
  ITEM: 'draggable'
}

const itemSource = {
  beginDrag(props: any) {
    return {
      id: props.data.id,
      text: props.data.text,
      color: props.data.color
    }
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
  data: any;
}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Draggable extends React.Component<DraggableProps, {}> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource (
      <div style={{opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : '', backgroundColor: this.props.data.color, display: this.props.data.display}} className={css.draggable}>
        <div className={css.draggable_text}>
          <Typography color="inherit">{this.props.data.text}</Typography>
        </div>
      </div>
    );
  }
}

export default DragSource(types.ITEM, itemSource, collect) (Draggable);
