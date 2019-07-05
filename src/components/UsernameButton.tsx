import {Button, Menu, MenuItem, MenuList, Typography} from "@material-ui/core";
import { connect } from "react-redux";
import * as React from "react";
import { PersonRounded as PersonRoundedIcon } from "@material-ui/icons";
import SignInPopup from "components/SignInPopup";
import store from "../store";
import * as reduxActions from "../actions";

const css = require("./UsernameButton.css");

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
    <>
      <SignInPopup open={signInPopupOpen} onClose={() => setSignInPopupOpen(false)}/>

      {
        props.username
          ?
          <Button color="inherit" variant="outlined" onClick={() => setSignOutPopperOpen(true)} ref={anchorRef} className={css.headerButton}>
            <Typography className={css.username}>{props.username}</Typography>
            <PersonRoundedIcon className={css.userIcon} />
          </Button>
          :
          <Button color="inherit" variant="outlined" onClick={() => setSignInPopupOpen(true)} className={css.headerButton}>
            Anmelden
            <PersonRoundedIcon className={css.userIcon} />
          </Button>
      }

      <Menu open={signOutPopperOpen} anchorEl={anchorRef.current} onClose={() => setSignOutPopperOpen(false)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={signOut}>Abmelden</MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = (state: { username: string }) => ({
  username: state.username,
});

export default connect(mapStateToProps)(UsernameButton);
