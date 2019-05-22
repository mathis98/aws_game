import * as React from 'react';
const css = require('./PageWrapper.css');

export default class PageWrapper extends React.Component {
  render() {
    return (
      <div className={css.component}>
        {this.props.children}
      </div>
    );
  }
}
