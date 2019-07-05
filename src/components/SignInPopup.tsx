import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as React from "react";
import { setUsername } from "../actions";
import store from "../store";

interface SignInPopupState {
  username?: string;
}

export interface SignInPopupProps {
  onClose: () => void;
  open: boolean;
}

class SignInPopup extends React.Component<SignInPopupProps, SignInPopupState> {
  constructor(props: SignInPopupProps) {
    super(props);
    this.state = {username: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose} maxWidth="xs" fullWidth>
        <DialogContent>
          <Typography variant="h5" style={{marginBottom: "0.75em", marginTop: "0.3em"}}>
            Anmelden
          </Typography>
            <TextField
              label="Nutzername"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleChange}
              fullWidth
              autoFocus
              onKeyPress={(e: any) => {if (e.key === 'Enter') {this.handleSignIn();}}}
            />
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.onClose} color="secondary">
            Schließen
          </Button>
          <Button color="primary" onClick={this.handleSignIn}>
            Anmelden
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({username: event.target.value});
  }

  handleSignIn() {
    store.dispatch(setUsername(this.state.username));
    this.props.onClose();
  }

}

export default connect()(SignInPopup);
