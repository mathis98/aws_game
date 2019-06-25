import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { ScoreState, scoreType, scoreSum } from '../reducers/score';
import { PersonRounded as PersonRoundedIcon, StarRounded as StarIcon } from '@material-ui/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { LEVEL_TITLES } from 'levels/levels';
import SignInPopup from "components/SignInPopup";

const css = require('./Header.css');


interface SignInPopupState {
  signInPopupOpen: boolean;
  anchorEl?: HTMLElement;
}

export interface HeaderProps extends RouteComponentProps {
  score: scoreType[];
  username: string;
}

class Header extends React.Component<HeaderProps, SignInPopupState> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = {signInPopupOpen: false};
  }

  render() {
    const totalPoints = scoreSum(this.props.score);
    return (
      <AppBar position="static" className={css.fixed_size_app_bar}>
        <Toolbar className={css.toolBar}>
          <Link to="/" className={css.link}>
            <Typography variant="h6" color="inherit" className={css.toolBarName}>
              AWS Boot Camp
            </Typography>
          </Link>

          <Menu
            keepMounted
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={() => this.setState({anchorEl: null})}
            disableAutoFocusItem
          >
            <MenuItem onClick={console.log} disabled divider style={{ opacity: 1 }}>Gesamtpunktzahl: {totalPoints} Punkte</MenuItem>
            {this.props.score.map((d, i) => {
              return (
                <MenuItem onClick={() => {this.props.history.push(`/levels/${i + 1}`); this.setState({anchorEl: null})}} key={`menuitem${i}`}>
                  <div className={css.levelName}>{`${i + 1}: ${LEVEL_TITLES[i]}`}</div>
                  {Boolean(d.points) && <div className={css.levelPoints}>{d.points} Pkt.</div>}
                  <div className={css.starContainer}>
                    <StarIcon className={cx(css.star, {[css.starFilled]: d.stars > 0})} />
                    <StarIcon className={cx(css.star, {[css.starFilled]: d.stars > 1})} />
                    <StarIcon className={cx(css.star, {[css.starFilled]: d.stars > 2})} />
                  </div>
                </MenuItem>)
            })}
          </Menu>

          <Button color="inherit" onClick={(event) => this.setState({anchorEl: event.currentTarget})}>
            <Typography variant="h6" color="inherit">
              {totalPoints} Punkte
            </Typography>
          </Button>


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
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: {score: ScoreState, username: string}) => ({
  username: state.username,
  score: state.score.score,
})

export default connect(mapStateToProps)(withRouter(Header));
