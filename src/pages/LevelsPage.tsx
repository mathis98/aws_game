import * as React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';

export default class LevelsPage extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Typography variant="h4" gutterBottom>
          Level wählen
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
