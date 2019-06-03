import * as React from 'react';

const css = require('./AWSProduct.css');

export interface AWSProductProps {
  icon: string;
  text: string;
}

export default class AWSProduct extends React.Component<AWSProductProps, {}> {
  render() {
    return (
      <div className={css.awsProduct}>
        <img src={require(`assets/img/${this.props.icon}.svg`) as string} className={css.awsProduct} />
        <span className={css.awsProductText}>{this.props.text}</span>
      </div>

    );
  }
}
