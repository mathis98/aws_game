import * as React from 'react';
import { Tooltip } from '@material-ui/core';
import cx from 'classnames';
const css = require('./IconElement.css');

export interface IconElementProps {
  image: string;
  description?: string;
  color?: string;
  thumbnailMode?: boolean;
}

// we need this component so we can properly place content into the splitter layout
export default class IconElement extends React.Component<IconElementProps, any> {
  render() {
    const img = <img
                  className={cx(css.iconElement, {[css.thumbnailIcon]: this.props.thumbnailMode})}
                  src={this.props.image}
                  alt={this.props.description}
                  style={{backgroundColor: this.props.color || ""}} />;
    return (
      this.props.description && !this.props.thumbnailMode ?
      <Tooltip title={this.props.description}>
        {img}
      </Tooltip>
      : img
    );
  }
}
