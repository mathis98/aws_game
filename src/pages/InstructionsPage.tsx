import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('../global.css');
import LinkButton from '../components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';

export interface InstructionsPageProps { compiler: string; framework: string; }

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class InstructionsPage extends React.Component<InstructionsPageProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <Typography variant="h4" gutterBottom>
          Anleitung
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
