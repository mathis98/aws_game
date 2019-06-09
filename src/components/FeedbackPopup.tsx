import * as React from 'react';
import { LevelFeedback } from 'levels/level';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import cx from "classnames";
import ClearIcon from '@material-ui/icons/ClearRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import Typography from '@material-ui/core/Typography';

const css = require('./FeedbackPopup.css');

export interface FeedbackPopupProps {
  onClose: () => void;
  feedback?: LevelFeedback;
  open: boolean;
}

export default class FeedbackPopup extends React.Component<FeedbackPopupProps, {}> {
  render() {

    let content, buttons, hint;

    if (this.props.feedback) {
      if (this.props.feedback.correct) {
        const starCount = this.props.feedback.stars || Math.ceil(3 * this.props.feedback.points / (this.props.feedback.maxPoints || 100)) || 3;
        const points = this.props.feedback.points || Math.round(100 * starCount / 3);
        content = <>
          <Typography variant="h5">
            Level abgeschlossen!
          </Typography>
          <div className={css.starContainer}>
            <Star delay={0.5} filled />
            <Star delay={1} filled={starCount > 1} />
            <Star delay={1.5} filled={starCount > 2} />
          </div>
          <AnimatedPoints value={points} ticks={4 * 60} />
          <Typography variant="body1">
            Gute Arbeit! Sie haben eine funktionierende Konfiguration gefunden.
            Wenn Sie noch nicht alle Sterne haben, können sie ihre Lösung noch
            verbessern oder zum nächsten Level gehen.
          </Typography>
        </>;
        buttons = <>
          <Button onClick={this.props.onClose}>Lösung verbessern</Button>
          <Button onClick={() => console.log("NOT IMPLEMENTED: save points and start next level")}>Nächstes Level</Button>
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
        hint = <>
          <hr className={css.slimHr} />
          <Typography variant="h6">
            Hinweise:
          </Typography>
          <div className={css.hintContainer}>
            {this.props.feedback.feedbackComponent}
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
