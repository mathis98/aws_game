import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('./StartPage.css');

import cx from "classnames";

export interface StartPageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class StartPage extends React.Component<StartPageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <div className={css.header_wrapper}>
        <h1 className={css.text}>
          🦅 AWS Bootcamp 🦅
        </h1>
        </div>
        <div className={css.button_group}>
          <Link className={cx(css.button, css.instruction_button)} to="/instruction">Anleitung</Link>
          <Link className={cx(css.button, css.start_button)} to="/game">Neues Spiel starten</Link>
          <Link className={cx(css.button, css.level_button)} to="/levels">Level wählen</Link>
        </div>
      </div>
    );
  }
}
