import * as React from 'react';
import PageWrapper from 'components/PageWrapper';
import LinkButton from '../components/LinkButton';
import ResetPopup from '../components/ResetPopup';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { resetScore } from '../actions';
import {ScoreState} from '../reducers/score';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const css = require('./StartPage.css');

export interface StartPageProps extends RouteComponentProps {
  level: number;
  score: any;
  dispatch: Function;
}

export interface StartPageState {
  resetOpen: boolean;
}

class StartPage extends React.Component<StartPageProps, StartPageState> {
  resetPoints = () => {
    if(this.props.score.findIndex((e: any) => e.points > 0) != -1)
      this.setState({ resetOpen: true });
    else this.props.history.push('levels/1');
  }
  deleteScore = () => {
    this.props.dispatch(resetScore());
    this.props.history.push('levels/1');
  }
  constructor(props: StartPageProps) {
    super(props);
    this.state = {resetOpen: false};
  }
  render() {
    return (
      <PageWrapper>
        <ResetPopup open={this.state.resetOpen} onClose = {() => this.setState({resetOpen: false})} deleteScore = {() => this.deleteScore()}/>
        <div className={css.button_group}>
          {this.props.level > 1 && <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to={`levels/${this.props.level}`}>
              Level {this.props.level} weiterspielen
            </LinkButton>
          </div>}
          <div className={css.start_button_wrapper}>
            <Button className={css.start_button} variant="contained" size="large" color="secondary" onClick={() => this.resetPoints()}>
              Neues Spiel starten
            </Button>
          </div>
          <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to="/levels">
              Level wählen
            </LinkButton>
          </div>
          <div className={css.start_button_wrapper}>
            <LinkButton className={css.start_button} variant="contained" size="large" color="secondary" to="/credits">
              Credits
            </LinkButton>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state: {score: ScoreState}) => ({
  level: state.score.level,
  score: state.score.score
})

export default connect(mapStateToProps)(withRouter(StartPage));
