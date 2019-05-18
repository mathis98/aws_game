import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('../global.css');
import LinkButton from '../components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import MarkdownViewer from '../components/MarkdownViewer';
import { Paper } from '@material-ui/core';

const anleitungMd = require("../../level_data/Anleitung.md").default;

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
        <Paper>
          <MarkdownViewer source={anleitungMd} />
        </Paper>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </div>
    );
  }
}
