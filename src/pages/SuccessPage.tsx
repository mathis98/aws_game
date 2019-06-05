import * as React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';

export default class SuccessPage extends React.Component<any, any> {
  render() {
    const { match: { params: { nextLevel } } } = this.props;

    return (
      <PageWrapper>
        <Typography variant="h4" color="primary" gutterBottom>
          Success!
        </Typography>
        <p>
          <LinkButton to={`/level/${nextLevel}`} variant="contained" color="primary">
            <ArrowForward/> Nächstes Level {nextLevel} Spielen!
          </LinkButton>
        </p>
      </PageWrapper>
    );
  }
}
