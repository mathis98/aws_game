import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
const css = require('./IconElement.css');

export interface IconElementProps {
  image: string;
  description?: string;
}

// we need this component so we can properly place content into the splitter layout
export default class IconElement extends React.Component<IconElementProps, any> {
  render() {
    const img = <img className={css.iconElement} src={this.props.image} alt={this.props.description} />;
    return (
      this.props.description ?
      <Tooltip title={this.props.description}>
        {img}
      </Tooltip>
      : img
    );
  }
}
