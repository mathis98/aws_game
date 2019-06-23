import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
 } from '@material-ui/core';

interface ResetPopupProps {
  open: boolean;
  onClose: () => void;
  deleteScore: () => void;
}

class ResetPopup extends React.Component<ResetPopupProps> {
  render() {
    console.log('rendering reset popup!');
    return (
      <>
        <Dialog
          open={this.props.open}
          onClose={() => this.setState({open: false})}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Alten Spielstand überschreiben?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Wenn Sie fortfahren wird Ihr alter Spielstand vollständig gelöscht.
              Wirklich fortfahren?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.onClose()} color="primary">
              Nein
            </Button>
            <Button onClick={() => this.props.deleteScore()} color="secondary" autoFocus>
              Ja, Spielstand löschen
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ResetPopup;
