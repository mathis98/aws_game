import * as React from 'react';
const css = require('../global.css');

import { DropTarget, ConnectDropTarget, DropTargetCollector } from 'react-dnd';

const types = {
  ITEM: 'draggable'
}

const squareTarget = {
  canDrop(props: any) {
      return true;
  },
  drop(props: any, monitor: any, component: any) {
    console.log(`Drop area ${props.id} is being dropped on by Draggable ${monitor.getItem().id}`);
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
  id: string;
  isOver?: boolean;
  canDrop?: boolean;
}

class Droppable extends React.Component<DroppableProps, {}> {

  border = (over: boolean, drop: boolean) => {
    if(!over && drop) return '2px dashed black';
    else if(over && drop) return '4px dashed black';
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div className={css.droppable} style={{border: this.border(isOver, canDrop)}}/>
    )
  }
}
export default DropTarget(types.ITEM, squareTarget, collect)(Droppable)
