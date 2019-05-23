import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MarkdownViewer from 'components/MarkdownViewer';

const { default: instructions } = require("level_data/level_1/popup.md");

export default class Popup extends React.Component<any, any> {
  handleCloseBound: any;

  constructor(props: any) {
    super(props);
    this.state = {open: true};

    // This binding is necessary to make `this` work in the callback
    this.handleCloseBound = this.handleClose.bind(this);
  }

  render() {
    return (
      <Dialog open={this.state.open} maxWidth={"lg"} >
        <DialogTitle id="alert-dialog-title">Anleitung</DialogTitle>
          <DialogContent>
            <MarkdownViewer source={instructions} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseBound} color="primary">
              Abbruch
            </Button>
            <Button onClick={this.handleCloseBound} color="primary" autoFocus>
              Weiter
            </Button>
          </DialogActions>
      </Dialog>
    );
  }

  handleClose() {
    this.setState({open: false});
  }
}
