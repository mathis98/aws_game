import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as React from "react";
import { PersonRounded as PersonRoundedIcon } from "@material-ui/icons";
import SignInPopup from "components/SignInPopup";

interface SignInPopupProps {
  username: string;
}

interface SignInPopupState {
  signInPopupOpen: boolean;
}

class UsernameButton extends React.Component<SignInPopupProps, SignInPopupState> {
  constructor(props: SignInPopupProps) {
    super(props);
    this.state = {signInPopupOpen: false};
  }

  render() {
    return (
      <div>
        <SignInPopup open={this.state.signInPopupOpen} onClose={() => this.setState({signInPopupOpen: false})}/>

        {
          this.props.username
            ?
            <Button
              color="inherit" variant="outlined"
              onClick={() => this.setState({signInPopupOpen: true})}
            >
              <Typography style={{textTransform: 'none'}}>{this.props.username}</Typography>
              <PersonRoundedIcon style={{marginLeft: '0.3em'}}/>
            </Button>

            :
            <Button
              color="inherit" variant="outlined"
              onClick={() => this.setState({signInPopupOpen: true})}
            >
              Anmelden
              <PersonRoundedIcon style={{marginLeft: '0.3em'}}/>
            </Button>

        }
      </div>
    );
  }
}

const mapStateToProps = (state: {username: string}) => ({
  username: state.username,
});

export default connect(mapStateToProps)(UsernameButton);
