import * as React from 'react';
import cx from 'classnames';
import { DragSource, ConnectDragSource } from 'react-dnd';

import Icon from '@material-ui/core/Icon';

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
  showMe: any;
  shown: string;
}

class Draggable extends React.Component<DraggableProps, any> {

  show = () => {
    if(this.props.shown == this.props.data.id) this.props.showMe('');
    else this.props.showMe(this.props.data.id);
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource (
      <div style={{opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : ''}} className={css.draggable}>
        <div onClick={() => {this.show()}}>
          {this.props.data.id != this.props.shown && <Icon className={css.info}>info</Icon>}
          {this.props.data.id == this.props.shown && <Icon className={css.info}>close</Icon>}
        </div>
        <img src={require(`../../../assets/img/${this.props.data.icon}.svg`) as string} className={css.draggable_icon} />
        <p className={css.draggable_text}>{this.props.data.text}</p>
      </div>

    );
  }
}

export default DragSource('draggable', itemSource, collect) (Draggable);
