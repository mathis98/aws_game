import * as React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ErrorPage extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Typography variant="h4" color="error" gutterBottom>
          404 - Seite nicht gefunden
        </Typography>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </PageWrapper>
    );
  }
}
