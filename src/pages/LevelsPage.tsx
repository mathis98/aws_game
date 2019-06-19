import * as React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/Lock';
import Lock from '@material-ui/icons/ArrowBack';
import CheckCircle from '@material-ui/icons/CheckCircle';

export default class LevelsPage extends React.Component {
  render() {
    return (
      <PageWrapper>
        <Typography variant="h4" gutterBottom>
          Level 
        </Typography>
        <p>
          <LinkButton to="https://slsgame.janbe.eu/levels/1" variant="contained" color="primary">
            <Lock/> Level 1
          </LinkButton>
        </p>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </PageWrapper>
    );
  }
}
