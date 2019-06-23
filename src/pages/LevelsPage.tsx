import * as React from 'react';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import { Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import {LEVELS, LEVEL_TITLES} from "levels/levels";

export default class LevelsPage extends React.Component {
  render() {
    const levelJsx = [];
      for (let i = 1; i <= LEVELS.length; i++) {
        levelJsx.push(
          <p>
            <LinkButton to={`levels/${i}`} variant="contained" color="secondary">
              Level {i}: {LEVEL_TITLES[i]}
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
            <ArrowBackIcon/> Zurück
          </LinkButton>
        </p>
      </PageWrapper>
    );
  }
}
