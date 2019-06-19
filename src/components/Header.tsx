import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {ScoreState} from '../reducers/score';

const css = require('./Header.css');
const sum = (arr: any) => {
  let sum = 0;
  for(let i of arr) sum += i.points;
  return sum;
}

export interface HeaderProps {
  score: number[];
}

class Header extends React.Component<HeaderProps, {}> {
  render() {
    console.log(this.props.score);
    return (
      <AppBar position="static" className={css.fixed_size_app_bar}>
        <Toolbar className={css.toolBar}>
          <Link to="/" className={css.link}>
            <Typography variant="h6" color="inherit" className={css.toolBarName}>
              AWS Boot Camp
            </Typography>
          </Link>

          <Typography variant="h6" color="inherit">
            {sum(this.props.score)} Punkte
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
