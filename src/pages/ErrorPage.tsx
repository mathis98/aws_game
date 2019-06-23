import * as React from 'react';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import { Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

export default class ErrorPage extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Typography variant="h4" color="error" gutterBottom>
          404 - Seite nicht gefunden
        </Typography>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBackIcon/> Zurück
          </LinkButton>
        </p>
      </PageWrapper>
    );
  }
}
