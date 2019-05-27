import * as React from 'react';
import { DragSource, ConnectDragSource } from 'react-dnd';

const css = require('./Draggable.css');


const itemSource = {
  beginDrag(props: any) {
    props.data.hide = true;
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
    const { connectDragSource } = this.props;
    return connectDragSource(!this.props.data.hide && this.props.data.component);
  }
}

export default DragSource('draggable', itemSource, collect) (Draggable);
