import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('./InstructionsPage.css');

export interface InstructionsPageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class InstructionsPage extends React.Component<InstructionsPageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <h1>
          🦅 InstructionsPage 🦅
        </h1>
        <p>
          <Link to="/">Zurück</Link>
        </p>
      </div>
    );
  }
}
