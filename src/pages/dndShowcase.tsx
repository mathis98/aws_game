import * as React from 'react';
import { Link } from 'react-router-dom';
const css = require('../global.css');
import LinkButton from '../components/LinkButton';
import Draggable from '../components/Draggable';
import Droppable from '../components/Droppable';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';

export interface dndShowcaseProps {
  compiler: string;
  framework: string;
  dropItem: string;
}

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class dndShowcase extends React.Component<dndShowcaseProps, {}> {
  render() {
    return (
      <div className={css.component_big}>
        <Typography variant="h4" gutterBottom>
          Beispielseite für Drag 'n' Drop
        </Typography>
        <Draggable id="a"/>
        <Droppable id="1"/>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </div>
    );
  }
}
