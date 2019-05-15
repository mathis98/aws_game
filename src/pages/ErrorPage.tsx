import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('./ErrorPage.css');

export interface ErroPageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ErrorPage extends React.Component<ErroPageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <h1>
          404 - Seite nicht gefunden
        </h1>
        <p>
          <Link to="/">Zum Start</Link>
        </p>
      </div>
    );
  }
}
