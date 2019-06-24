import * as React from 'react';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import { Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import {LEVELS, LEVEL_TITLES} from "levels/levels";

const css = require('./LevelsPage.css');

export default class LevelsPage extends React.Component {
  render() {
    const levelJsx = [];
      for (let i = 1; i <= LEVELS.length; i++) {
        levelJsx.push(
          <p>
            <LinkButton className={css.button_group} to={`levels/${i}`} variant="contained" color="secondary" fullWidth={true}
                        style={{justifyContent: 'left', textTransform: "none"}}>
              Level {i}: {LEVEL_TITLES[i - 1]}
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
