import * as React from 'react';
import { LevelFeedback } from 'levels/level';
import { DialogContent, DialogActions, Dialog, Typography, Button } from '@material-ui/core';
import cx from "classnames";
import { ClearRounded as ClearIcon, StarRounded as StarIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { setNextLevel } from '../actions';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ScoreType, ScoreState } from 'src/reducers/score';
import CountUp from './CountUp';

const css = require('./FeedbackPopup.css');

export interface FeedbackPopupProps extends RouteComponentProps {
  onClose: () => void;
  feedback?: LevelFeedback;
  open: boolean;
  levelId: number;
  dispatch: Function;
  score: ScoreType[];
  endScreenTrigger: Function;
}

export interface FeedbackPopupState {
  feedback?: LevelFeedback;
}

class FeedbackPopup extends React.Component<FeedbackPopupProps, FeedbackPopupState> {
  state: FeedbackPopupState = {};

  nextLevelBound = this.nextLevel.bind(this);

  componentWillReceiveProps(props: FeedbackPopupProps, state: FeedbackPopupState) {
    this.setState({feedback: props.feedback});
  }

  nextLevel() {
    if (this.props.score.every((el) => el.points > 0)) {
      this.props.endScreenTrigger();
    } else {
      this.props.dispatch(setNextLevel(this.props.levelId + 1));
      this.props.history.push(`/levels/${this.props.levelId + 1}`);
    }
  }

  render() {

    let content, buttons, hint;

    if (this.props.feedback) {
      if (this.props.feedback.correct) {
        content = <>
          <Typography variant="h5">
            Level abgeschlossen!
          </Typography>
          <div className={css.starContainer}>
            <Star delay={0.5} filled />
            <Star delay={1} filled={this.state.feedback.stars > 1} />
            <Star delay={1.5} filled={this.state.feedback.stars > 2} />
          </div>
          <div className={css.pointsContainer}>
            <Typography variant="h3" align="center">
              <span>+</span>
              <CountUp value={this.state.feedback.points} ticks={4 * 60} />
            </Typography>
          </div>
          <Typography variant="body1">
            Gute Arbeit! Sie haben eine funktionierende Konfiguration gefunden.
            Wenn Sie noch nicht alle Sterne haben, können sie ihre Lösung noch
            verbessern oder zum nächsten Level gehen.
          </Typography>
        </>;
        buttons = <>
          <Button onClick={this.props.onClose}>Lösung verbessern</Button>
          <Button onClick={this.nextLevelBound}>Nächstes Level</Button>
        </>;
      } else {
        content = <>
          <Typography variant="h5">
            Level fehlgeschlagen!
          </Typography>
          <ClearIcon className={css.failIcon} />
          <Typography variant="body1">
            Die von Ihnen erstellte Lösung funktioniert so noch nicht.
            Schauen Sie sich nachmal die Infotexte der einzelnen
            Services an und überarbeiten Sie ihre Lösung.
          </Typography>
        </>
        buttons = <Button onClick={this.props.onClose}>Lösung bearbeiten</Button>;
      }

      if (this.props.feedback.feedbackComponent) {
        const feedback = typeof this.props.feedback.feedbackComponent === "string" ?
          <Typography variant="body1">
            {this.props.feedback.feedbackComponent}
          </Typography> :
          this.props.feedback.feedbackComponent;
        hint = <>
          <hr className={css.slimHr} />
          <Typography variant="h6">
            Hinweis:
          </Typography>
          <div className={css.hintContainer}>
            {feedback}
          </div>
        </>
      }
    }

    return (
      <Dialog open={!!this.props.open} onClose={this.props.onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          {content}
          {hint}
        </DialogContent>
        <DialogActions>
          {buttons}
        </DialogActions>
      </Dialog>
    )
  }
}

class Star extends React.Component<{filled?: boolean, delay: number}, {}> {
  render() {
   return (
     <StarIcon className={cx(css.star, {[css.starFilled]: this.props.filled})} style={{animationDelay: `${this.props.delay}s`}} />
   );
  }
}

const mapStateToProps = (state: { score: ScoreState }) => ({
  score: state.score.score,
});

export default connect(mapStateToProps)(withRouter(FeedbackPopup));
