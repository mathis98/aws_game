import * as React from 'react';
import { Link } from 'react-router-dom';
import LinkButton from '../components/LinkButton';

const css = require('./StartPage.css');
import cx from "classnames";

export interface StartPageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class StartPage extends React.Component<StartPageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <div className={css.button_group}>
          <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to="/instruction">
              Anleitung
            </LinkButton>
          </div>
          <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to="/game">
              Neues Spiel starten
            </LinkButton>
          </div>
          <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to="/levels">
              Level wählen
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }
}
