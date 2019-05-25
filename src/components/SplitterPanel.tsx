import * as React from 'react';
import cx from 'classnames';
const css = require('./SplitterPanel.css');

export interface SplitterPanelProps {
  className?: string;
}

// we need this component so we can properly place content into the splitter layout
export default class SplitterPanel extends React.Component<SplitterPanelProps, any> {
  render() {
    return (
      <div className={css.panelWrapper} >
        <div className={cx(css.panelInner, this.props.className)} >
          {this.props.children}
        </div>
      </div>
    );
  }
}
