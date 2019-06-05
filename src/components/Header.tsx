import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const css = require('./Header.css');

export interface HeaderProps {}

// 'HeaderProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class Header extends React.Component<HeaderProps, any> {
  render() {
    return (
      <AppBar position="static" className={css.fixed_size_app_bar}>
        <Toolbar className={css.toolBar}>
          <Typography variant="h6" color="inherit">
            AWS Boot Camp
          </Typography>

          <Typography variant="h7" color="inherit">
            42 Punkte
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
