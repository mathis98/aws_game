import * as React from 'react';

const css = require('./AWSProduct.css');

export interface AWSProductProps {
  icon: string;
  text: string;
}
const colors: any = {
  "s3": "#3F8624",
  "dynamodb": "#3B48CC"
}

export default class AWSProduct extends React.Component<AWSProductProps, {}> {
  render() {
    return (
      <div className={css.awsProduct} style={{ backgroundColor: colors[this.props.icon] || "#000"}}>
        <img src={require(`assets/img/${this.props.icon}.svg`) as string} className={css.awsProduct} />
        <span className={css.awsProductText}>{this.props.text}</span>
      </div>

    );
  }
}
