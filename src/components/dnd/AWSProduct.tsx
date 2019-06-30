import * as React from 'react';
import { Typography } from '@material-ui/core';

const css = require('./AWSProduct.css');

export interface AWSProductProps {
  icon: string;
  text?: string;
  color: string;
  noText?: boolean;
}

export default class AWSProduct extends React.Component<AWSProductProps, {}> {
  render() {
    const img = require(`assets/img/${this.props.icon}.svg`);
    return (
      <div className={css.awsProduct} style={{backgroundColor: this.props.color}}>
        <div className={css.awsProductIcon} style={{backgroundImage: `url(${img})`}} />
        <div className={css.awsProductNameWrapper}>
          {!this.props.noText &&
          <Typography variant="body1" component="span" className={css.awsProductName}>
            {this.props.text}
          </Typography>
          }
        </div>
      </div>
    );
  }
}
