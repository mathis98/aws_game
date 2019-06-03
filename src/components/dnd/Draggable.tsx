import * as React from 'react';
import cx from 'classnames';
import { DragSource, ConnectDragSource } from 'react-dnd';

const css = require('./Draggable.css');

const itemSource = {
  beginDrag(props: any) {
    return {
      id: props.id,
      component: props.component
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
  id: string;
  component: JSX.Element;
}

class Draggable extends React.Component<DraggableProps, {}> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource (
      <div className={cx(css.draggable, {[css.dragging]: isDragging})}>
        {this.props.component}
      </div>
    );
  }
}

export default DragSource('draggable', itemSource, collect) (Draggable);
