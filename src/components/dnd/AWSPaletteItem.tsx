import * as React from 'react';
import Draggable from 'components/dnd/Draggable';
import AWSProduct from 'components/dnd/AWSProduct';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

const css = require('./AWSPaletteItem.css');

export interface AWSPaletteItemProps {
  icon: string;
  text: string;
  id: string;
  color: string;
  infoCallback?: any;
}

export default class AWSPaletteItem extends React.Component<AWSPaletteItemProps, {}> {
  render() {
    const awsProduct = <div> <AWSProduct icon={this.props.icon} text={this.props.text} color={this.props.color}/> </div>;
    return (
      <div className={css.paletteItem}>
        <Draggable component={awsProduct} id={this.props.id} />
        <Tooltip title="Info" placement="top">
          <IconButton className={css.infoButton} onClick={() => this.props.infoCallback(this.props.id)}>
            <InfoIcon fontSize="small" color="inherit" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}
