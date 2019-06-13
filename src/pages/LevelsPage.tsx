import * as React from 'react';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import levels from "levels/levels";

export default class LevelsPage extends React.Component {
  render() {
    const levelJsx = [];
      for (let i = 1; i <= levels.length; i++) {
        levelJsx.push(
          <p>
            <LinkButton to={`levels/${i}`} variant="contained" color="secondary">
              Level {i}
            </LinkButton>
          </p>)
      }


    return (
      <PageWrapper>
        <Typography variant="h4" gutterBottom>
          Level wählen
        </Typography>

        {levelJsx}

        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </PageWrapper>
    );
  }
}
