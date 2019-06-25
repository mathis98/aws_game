import { Button, Dialog, DialogActions, TextField } from "@material-ui/core";
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
      <Dialog open={this.props.open} onClose={this.props.onClose} maxWidth="md">
        <TextField
          label="Nutzername"
          variant="outlined"
          value={this.state.username}
          onChange={this.handleChange}
        />

        <Button onClick={this.handleSignIn}>Anmelden</Button>

        <DialogActions>
          <Button onClick={this.props.onClose} color="secondary">
            Schließen
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
  }

}

export default connect()(SignInPopup);
