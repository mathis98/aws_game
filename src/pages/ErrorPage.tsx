import * as React from 'react';
import { Typography, Button, Container } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { withRouter, RouteComponentProps } from 'react-router';

const css = require("./ErrorPage.css");

class ErrorPage extends React.Component<RouteComponentProps, {}> {
  render() {
    return (
      <Container maxWidth="xs" className={css.wrapper}>
        <Typography variant="h1" align="center" color="error">
          404
        </Typography>

        <Typography variant="subtitle1" align="center" gutterBottom>
          Seite nicht gefunden
        </Typography>
        <div className={css.buttonWrapper}>
          <Button variant="outlined" color="primary" onClick={this.props.history.goBack}>
            Zurück
          </Button>
        </div>
      </Container>
    );
  }
}

export default withRouter(ErrorPage);
