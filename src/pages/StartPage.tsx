import * as React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/PageWrapper';
import LinkButton from '../components/LinkButton';

const css = require('./StartPage.css');
import cx from "classnames";

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class StartPage extends React.Component {
  render() {
    return (
      <PageWrapper>
        <div className={css.button_group}>
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
      </PageWrapper>
    );
  }
}
