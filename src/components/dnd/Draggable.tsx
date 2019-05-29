import * as React from 'react';
import cx from 'classnames';
import { DragSource, ConnectDragSource } from 'react-dnd';

import Info from '@material-ui/icons/Info';

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
      <div style={{opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : ''}} className={css.draggable}>
        <Info className={css.info}/>
        <img src={require(`../../../assets/img/${this.props.data.icon}.svg`) as string} className={css.draggable_icon} />
        <p className={css.draggable_text}>{this.props.data.text}</p>
      </div>

    );
  }
}

export default DragSource('draggable', itemSource, collect) (Draggable);
