import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('./StartPage.css');

export interface LevelsPageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class LevelsPage extends React.Component<LevelsPageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <h1>
          🦅 LevelsPage 🦅
        </h1>
        <p>
          <Link to="/">Zurück</Link>
        </p>
      </div>
    );
  }
}
