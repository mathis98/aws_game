import * as React from 'react';

const css = require('./AWSProduct.css');

export interface StandardProps {
  icon: string;
  text: string;
}

export default class AWSProduct extends React.Component<StandardProps, {}> {
  render() {
    return (
      <div className={css.awsProduct}>
        <img src={require(`../../../assets/img/${this.props.icon}.svg`) as string} className={css.draggable_icon} />
        <span className={css.awsProductText}>{this.props.text}</span>
      </div>

    );
  }
}
