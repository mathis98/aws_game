import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import {ScoreState} from '../reducers/score';

const css = require('./Header.css');

export interface HeaderProps {
  score: number;
}

class Header extends React.Component<HeaderProps, {}> {
  render() {
    console.log("hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");

    return (
      <AppBar position="static" className={css.fixed_size_app_bar}>
        <Toolbar className={css.toolBar}>
          <Link to="/" className={css.link}>
            <Typography variant="h6" color="inherit" className={css.toolBarName}>
              AWS Boot Camp
            </Typography>
          </Link>

          <Typography variant="h6" color="inherit">
            {this.props.score} Punkte
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: {score: ScoreState}) => ({
  score: state.score.score,
})

export default connect(mapStateToProps)(Header);
