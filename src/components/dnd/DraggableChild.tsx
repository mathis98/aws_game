import * as React from 'react';
const css = require('./Draggable.css');

import { DragSource, ConnectDragSource } from 'react-dnd';
import Typography from '@material-ui/core/Typography';
import { draggableDataProps } from './Draggable';

const types = {
  ITEM: 'draggable'
}

const itemSource = {
  beginDrag(props: any) {
    props.data.hide = true;
    props.undoWin();
    return {
      id: props.data.id,
      text: props.data.text,
      icon: props.data.icon
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
  data: draggableDataProps;
  undoWin: any;
}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Draggable extends React.Component<DraggableProps, {}> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource (
      <div style={{opacity: isDragging ? 0 : 1, cursor: isDragging ? 'grabbing' : '', display: this.props.data.hide ? 'none' : 'block'}} className={css.draggable_big}>
        <img src={require(`../../../assets/img/${this.props.data.icon}.svg`) as string} />
      </div>
    );
  }
}

export default DragSource(types.ITEM, itemSource, collect) (Draggable);
