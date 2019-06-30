import * as React from 'react';
import { LevelFeedback } from 'levels/level';
import { DialogContent, DialogActions, Dialog, Typography, Button } from '@material-ui/core';
import cx from "classnames";
import { ClearRounded as ClearIcon, StarRounded as StarIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { setScore, setNextLevel } from '../actions';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const css = require('./FeedbackPopup.css');

export interface FeedbackPopupProps extends RouteComponentProps {
  onClose: () => void;
  feedback?: LevelFeedback;
  open: boolean;
  levelId: number;
  dispatch: Function;
}

export interface FeedbackPopupState {
  feedback?: LevelFeedback;
  starCount: number;
  points: number;
}

class FeedbackPopup extends React.Component<FeedbackPopupProps, FeedbackPopupState> {
  state: FeedbackPopupState = {
    starCount: 0,
    points: 0,
  };

  nextLevelBound = this.nextLevel.bind(this);

  componentWillReceiveProps(props: FeedbackPopupProps, state: FeedbackPopupState) {
    this.setState({feedback: props.feedback});

    if (props.feedback && props.feedback.correct) {
      // cast stars to 1 | 2 | 3
      if(props.feedback.stars <= 1)
        props.feedback.stars = 1;
      if(props.feedback.stars == 2)
        props.feedback.stars = 2;
      if(props.feedback.stars >= 3)
        props.feedback.stars = 3;

      const starCount = props.feedback.stars || Math.ceil(3 * props.feedback.points / (props.feedback.maxPoints || 100)) || 3;
      const points = props.feedback.points || Math.round(100 * starCount / 3);
      this.setState({starCount, points});
    }
  }

  nextLevel() {
    this.props.dispatch(setScore(this.state.points, this.props.levelId, this.state.starCount));
    this.props.dispatch(setNextLevel(this.props.levelId + 1));
    this.props.history.push(`/levels/${this.props.levelId + 1}`);
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
            <Star delay={1} filled={this.state.starCount > 1} />
            <Star delay={1.5} filled={this.state.starCount > 2} />
          </div>
          <AnimatedPoints value={this.state.points} ticks={4 * 60} />
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
      <Dialog open={!!this.props.open} maxWidth="sm" fullWidth>
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

interface AnimatedPointsProps {
  value: number;
  ticks: number;
}

class AnimatedPoints extends React.Component<AnimatedPointsProps, {currentTick: number}> {
  interval: any;

  constructor(props: AnimatedPointsProps) {
    super(props);
    this.state = {currentTick: 0};
  }

  sigmoid(x: number) {
    return 2 * (1 / (1 + Math.pow(Math.E, -5 * x)) - 0.5) / 0.9866142981514305;
  }

  render() {
    return (
      <div className={css.pointsContainer}>
        <Typography variant="h3" align="center">
          <span>+</span>
          {Math.round(this.sigmoid(this.state.currentTick/this.props.ticks) * this.props.value)}
        </Typography>
      </div>
    );
  }

  tick() {
    const nextTick = this.state.currentTick + 1;
    if (nextTick > this.props.ticks) {
      clearInterval(this.interval);
      return;
    }

    this.setState({currentTick: nextTick});
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000 / 60);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default connect()(withRouter(FeedbackPopup));
