import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as React from "react";
import { PersonRounded as PersonRoundedIcon } from "@material-ui/icons";
import SignInPopup from "components/SignInPopup";
import store from "../store";
import * as reduxActions from "../actions";

interface SignInPopupProps {
  username: string;
}

const UsernameButton = (props: SignInPopupProps) => {

  const [signInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [signOutPopperOpen, setSignOutPopperOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setSignOutPopperOpen(false);
  };


  const signOut = (event: any): void => {
    store.dispatch(reduxActions.setUsername(''));
    store.dispatch(reduxActions.resetScore());
    setSignOutPopperOpen(false);
  };

  return (
    <div>
      <SignInPopup open={signInPopupOpen} onClose={() => setSignInPopupOpen(false)}/>

      {
        props.username
          ?
          <Button id={"hmmm"}
                  color="inherit" variant="outlined"
                  onClick={() => setSignOutPopperOpen(true)}
                  ref={anchorRef}
          >
            <Typography style={{textTransform: 'none'}}>{props.username}</Typography>
            <PersonRoundedIcon style={{marginLeft: '0.3em'}}/>
          </Button>

          :
          <Button
            color="inherit" variant="outlined"
            onClick={() => setSignInPopupOpen(true)}
          >
            Anmelden
            <PersonRoundedIcon style={{marginLeft: '0.3em'}}/>
          </Button>

      }

      <Popper open={signOutPopperOpen} anchorEl={anchorRef.current} transition disablePortal>
        {({TransitionProps, placement}) => (
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
                    <Button onClick={signOut}>Abmelden</Button>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

    </div>
  );
};

const mapStateToProps = (state: { username: string }) => ({
  username: state.username,
});

export default connect(mapStateToProps)(UsernameButton);
