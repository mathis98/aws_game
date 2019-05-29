import * as React from 'react';

import Info from '@material-ui/icons/Info';

const css = require('./Draggable.css');

export interface StandardProps {
  icon: string;
  text: string;
}

export default class Standard extends React.Component<StandardProps, {}> {
  render() {
    return (
      <div className={css.draggable_big}>
        <img src={require(`../../../assets/img/${this.props.icon}.svg`) as string} className={css.draggable_icon} />
        <p className={css.draggable_text}>{this.props.text}</p>
      </div>

    );
  }
}
