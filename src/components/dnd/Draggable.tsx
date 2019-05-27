import * as React from 'react';
import cx from 'classnames';
import { DragSource, ConnectDragSource } from 'react-dnd';

const css = require('./Draggable.css');


const itemSource = {
  beginDrag(props: any) {
    return {
      id: props.data.id,
      component: props.data.component
    }
  },
  endDrag() {}
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

class Draggable extends React.Component<DraggableProps, {}> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource (
      <div className={cx({ [css.draggableActive]: isDragging })}>
        {this.props.data.component}
      </div>
    );
  }
}

export default DragSource('draggable', itemSource, collect) (Draggable);
