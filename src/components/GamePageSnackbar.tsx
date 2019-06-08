import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from 'react-transition-group/Transition';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const css = require('./GamePageSnackbar.css');


export interface GamePageSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

export default class GamePageSnackbar extends React.Component<GamePageSnackbarProps, {}> {
  render() {
    const content = <>
      <span>{this.props.message}</span>
      <IconButton onClick={this.props.onClose} className={css.closeButton} color="inherit">
        <CloseIcon />
      </IconButton>
    </>;

    return (
      <Snackbar
        open={this.props.open}
        autoHideDuration={5000}
        onClose={this.props.onClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        message={content}
        className={css.snackbar}
        TransitionComponent={Transition}
      />
    );
  }
}
