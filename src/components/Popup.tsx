import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MarkdownViewer from 'components/MarkdownViewer';

const { default: instructions } = require("level_data/level_1/popup.md");

class Popup extends React.Component<any, any> {
  handleNextBound: any;
  handleCancelBound: any;

  constructor(props: any) {
    super(props);
    this.state = {open: true};

    // This binding is necessary to make `this` work in the callback
    this.handleNextBound = this.handleNext.bind(this);
    this.handleCancelBound = this.handleCancel.bind(this);
  }

  render() {
    return (
      <Dialog open={this.state.open} maxWidth={"md"}>
        <DialogContent>
          <MarkdownViewer source={instructions} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancelBound} color="secondary">
            Abbruch
          </Button>
          <Button onClick={this.handleNextBound} color="primary" autoFocus>
            Weiter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleNext() {
    this.setState({open: false});
  }

  handleCancel() {
    this.props.history.push('/');
  }
}

export default withRouter(Popup);
