import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('./GamePage.css');

export interface GamePageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GamePage extends React.Component<GamePageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <h1>
          🦅 GamePage 🦅
        </h1>
        <p>
          <Link to="/">Zurück</Link>
        </p>
      </div>
    );
  }
}
