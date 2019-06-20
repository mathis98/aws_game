import * as React from 'react';
import PageWrapper from 'components/PageWrapper';
import LinkButton from '../components/LinkButton';

import { connect } from 'react-redux';
import {ScoreState} from '../reducers/score';

const css = require('./StartPage.css');

export interface StartPageProps {
  level: number;
}

class StartPage extends React.Component<StartPageProps> {
  render() {
    return (
      <PageWrapper>
        <div className={css.button_group}>
          {this.props.level > 1 && <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to={`levels/${this.props.level}`}>
              Level {this.props.level} weiterspielen
            </LinkButton>
          </div>}
          <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to="/levels/1">
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

const mapStateToProps = (state: {score: ScoreState}) => ({
  level: state.score.level,
})

export default connect(mapStateToProps)(StartPage);
