import * as React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/PageWrapper';
import LinkButton from 'components/LinkButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import MarkdownViewer from 'components/MarkdownViewer';
import Paper from '@material-ui/core/Paper';

const { default: anleitungMd } = require("level_data/Anleitung.md");

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class InstructionsPage extends React.Component {
  render() {
    return (
      <PageWrapper>
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
      </PageWrapper>
    );
  }
}
