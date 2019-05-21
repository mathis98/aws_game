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
}

var draggables: any = [
  {
    'id': 'a',
    'text': 'S3',
    'color': '#3f51b5'
  },
  {
    'id': 'b',
    'text': 'DynamoDB',
    'color': '#f50057'
  }
]

var droppables: any = [
  {
    'id': 1,
    'accepts': 'a',
    'done': false
  },
  {
    'id': 2,
    'accepts': 'b',
    'done': false
  }
]

// 'StartPageProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class dndShowcase extends React.Component<dndShowcaseProps, {}> {

  droppableDone = (id: string, correct: boolean) => {
    if(correct) {
      droppables.find((a: any) => a.id == id).done = true;
      if(droppables.every((a: any) => a.done))
        alert('Du hast gewonnen!');
    }
    else droppables.find((a: any) => a.id == id).done = false;
  }

  render() {
    return (
      <div className={css.component_big}>
        <Typography variant="h4" gutterBottom>
          Beispielseite für Drag 'n' Drop
        </Typography>
        <Droppable data={droppables[0]} setDroppableDone={this.droppableDone}/>
        <Droppable data={droppables[1]} setDroppableDone={this.droppableDone}/>
        <Draggable data={draggables[0]}/>
        <Draggable data={draggables[1]}/>
        <p>
          <LinkButton to="/" variant="contained" color="primary">
            <ArrowBack/> Zurück
          </LinkButton>
        </p>
      </div>
    );
  }
}
