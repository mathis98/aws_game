import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('../global.css');
import LinkButton from '../components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';

export interface LevelsPageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class LevelsPage extends React.Component<LevelsPageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <Typography variant="h4" gutterBottom>
          Level wählen
        </Typography>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </div>
    );
  }
}
