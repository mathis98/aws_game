import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from "@material-ui/core";
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

const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);

function handleClose(event: any) {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpen(false);
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
            <Button id={"hmmm"}
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

        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                      <MenuItem
                      >
                        Text
                      </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

      </div>
    );
  }
}

const mapStateToProps = (state: {username: string}) => ({
  username: state.username,
});

export default connect(mapStateToProps)(UsernameButton);
