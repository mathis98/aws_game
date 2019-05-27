import * as React from 'react';
const css = require('./Draggable.css');

import { DragSource, ConnectDragSource } from 'react-dnd';
import Typography from '@material-ui/core/Typography';
import Info from '@material-ui/icons/Info';

const types = {
  ITEM: 'draggable'
}

const itemSource = {
  beginDrag(props: any) {
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

export interface draggableDataProps {
  id: string,
  text: string,
  icon: string,
  hide?: boolean
}

export interface DraggableProps {
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
  data: draggableDataProps;
}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Draggable extends React.Component<DraggableProps, {}> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource (
      <div style={{opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : ''}} className={css.draggable}>
        <Info className={css.info}/>
        <img src={require(`../../../assets/img/${this.props.data.icon}.svg`) as string} />
      </div>
    );
  }
}

export default DragSource(types.ITEM, itemSource, collect) (Draggable);
