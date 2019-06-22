import * as React from 'react';
import cx from 'classnames';
import { DropTarget, ConnectDropTarget } from 'react-dnd';
import DraggableChild from 'components/dnd/DraggableChild';

const css = require('./Droppable.css');

const squareTarget = {
  canDrop() {
      return true;
  },
  drop(props: any, monitor: any) {
    props.data.child = monitor.getItem();
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
}

export class DroppableType extends React.Component<DroppableProps, {}> {
  constructor(props: DroppableProps) {
    super(props);
    this.props.data.child.hide = true; // hide droppable child on creation
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;

    return connectDropTarget(
      <div className={cx(css.droppable, { [css.droppableHover]: isOver, [css.droppableActive]: canDrop})} >
        {<DraggableChild data={this.props.data.child} />}
      </div>
    )
  }
}

export default DropTarget('draggable', squareTarget, collect)(DroppableType);
