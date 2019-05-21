import * as React from 'react';
const css = require('./Droppable.css');

import { DropTarget, ConnectDropTarget, DropTargetCollector } from 'react-dnd';
import Typography from '@material-ui/core/Typography';

const types = {
  ITEM: 'draggable'
}

const squareTarget = {
  canDrop(props: any) {
      return true;
  },
  drop(props: any, monitor: any, component: any) {
    props.data.bg = monitor.getItem().color;
    props.data.text = monitor.getItem().text;
    if(monitor.getItem().id == props.data.accepts)
      props.setDroppableDone(props.data.id, true);
    else props.setDroppableDone(props.data.id, false);
  }
};

const collect = (connect: any, monitor: any) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

export interface DroppableProps {
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
  canDrop?: boolean;
  data: any;
  setDroppableDone: any;
}

class Droppable extends React.Component<DroppableProps, {}> {

  border = (over: boolean, drop: boolean) => {
    if(!over && drop) return '2px dashed black';
    else if(over && drop) return '4px dashed black';
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div className={css.droppable} style={{border: this.border(isOver, canDrop), backgroundColor: this.props.data.bg}}>
        <div className={css.droppable_text}>
          <Typography color="inherit">{this.props.data.text}</Typography>
        </div>
      </div>
    )
  }
}
export default DropTarget(types.ITEM, squareTarget, collect)(Droppable)
