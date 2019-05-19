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
  dropItem = '';
  changeDropItem = (id: string) => {
    this.dropItem = id;
    console.log(`changing drop item to ${this.dropItem}`);
  };
  render() {
    return (
      <div className={css.component_big}>
        <Typography variant="h4" gutterBottom>
          Beispielseite für Drag 'n' Drop
        </Typography>
        <Draggable id="a" callback={this.changeDropItem}/>
        <Droppable id="1" item={this.dropItem}/>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </div>
    );
  }
}
